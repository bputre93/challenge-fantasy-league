import { Injectable, NotFoundException } from '@nestjs/common';
import { ScoreRepository } from './score.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterScoreDto } from './dto/enter-score.dto';
import { Score } from './score.entity';
import { ScoringRepository } from 'src/scoring/scoring.repository';
import { ChallengerRepository } from 'src/challengers/challenger.repository';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(ScoreRepository)
        private scoreRepository: ScoreRepository,
        @InjectRepository(ScoringRepository)
        private scoringRepository: ScoringRepository,
        @InjectRepository(ChallengerRepository)
        private challengerRepository: ChallengerRepository,
    )
        {}

    async enterWeeklyScore(enterScoreDto: EnterScoreDto): Promise<Score> {
        const rule = await this.scoringRepository.findOne(enterScoreDto.rule);
        const challenger = await this.challengerRepository.findOne(enterScoreDto.challenger);
        if(!challenger){
            throw new NotFoundException(`challenger with id ${enterScoreDto.challenger} not found`)
        }
        const score =  await this.scoreRepository.enterWeeklyScore(enterScoreDto, rule, challenger);

        const challengerNewScore = await this.updateChallengerTotalScore(challenger.id);

        score.challenger.points = challengerNewScore;

        if(rule.type.indexOf('Loss') !== -1) { //this is janky
            challenger.eliminated = true;
            await this.challengerRepository.save({eliminated: true, id: challenger.id})
        } 
        if (rule.type.indexOf('Elimination Win')!== -1) {
            challenger.redSkulls += 1;
        }
        return score;
    }

    async getAllScores(): Promise<Score[]> {
        return await this.scoreRepository.find();
    }

    async getScoreById(id: number): Promise<Score> {
        return await this.scoreRepository.findOne(id);
    }

    async getScoresByWeek(id: number): Promise<Score[]> {
        return await this.scoreRepository.find({
            where: {week: id},
            order: {id: "ASC"}
        });
    }

    async getScoresByChallenger(id: number): Promise<Score[]> {
        return await this.scoreRepository.find({
            relations: ['challenger'],
            where: {challenger: id},
            order: {id: 'ASC'}
        })
    }


    async deleteAllScores(): Promise<void> {
         await this.scoreRepository.deleteAllScores();

         await this.challengerRepository.zeroAllChallengerPoints();
    }

    async deleteScore(id: number): Promise<void> {
        const challengerId = (await this.scoreRepository.findOne({id})).challenger.id
        
        const result = await this.scoreRepository.delete({id});

        if(result.affected === 0) {
            throw new NotFoundException(`Scoring record with id ${id} not found`)
        }

        this.updateChallengerTotalScore(challengerId);
    }


    async getCountsOfEachRule() {
        const scoreCounts = await this.scoreRepository.getCountsByRuleId()
        const rules = await this.scoringRepository.find(); //don't need this but easier than finding unique
        scoreCounts.forEach(el => {
            const match = rules.find(rule => rule.id == el.rule);
            el.type = match.type;
        })

        return scoreCounts;
    }

    async challengerWeeklyScores() {
        const scores = await this.getAllScores();
        const fullStandingsData = [];
        scores.forEach(el => {
            const challIndex = this.findObjectIndex(fullStandingsData,'challenger',el.challenger.name)
            if(challIndex !== -1){
                const week = `week${el.week}`;
                fullStandingsData[challIndex][week] += el.rule.points;
                fullStandingsData[challIndex].total += el.rule.points;
            } else if(challIndex === -1) {
                fullStandingsData.push({challenger: el.challenger.name, week1:0,week2:0,week3:0,week4:0,week5:0,week6:0,week7:0,week8:0,week9:0,week10:0, week11:0, week12:0, week13:0, week14:0, week15:0, week16:0,total:0})
                const newChall = fullStandingsData.length-1;
                const week = `week${el.week}`;
                fullStandingsData[newChall][week] += el.rule.points;
                fullStandingsData[newChall].total += el.rule.points;
            }
        });
        return fullStandingsData;
    }

    async teamsTotalPointsByWeek() {
        const teamWeeklyScores= []
        const teamRunningScores = [];
        const challWeeklyScores = await this.challengerWeeklyScores();
        //get team id, owner for each object in challWeeklyScores
        for (const el of challWeeklyScores) {
            const chall = await this.challengerRepository.findOne({where:{name: el.challenger}, relations:['team']});
            el.teamId = chall.team.id
            el.owner = chall.team.owner;
            el.team = chall.team.name;
        //combine team scores into total weekly points
            const teamIndex = this.findObjectIndex(teamWeeklyScores, 'team', el.teamId);
            if(teamIndex !== -1) {
                const entries = Object.entries(el)
                for(const [week, points] of entries){
                    if (week.indexOf('week') !== -1){
                        const int = parseInt(week.slice(4,week.length))-1;
                        teamWeeklyScores[teamIndex].totals[int] += points;
                    }
                }
            } else if(teamIndex === -1){
                teamWeeklyScores.push({teamId: el.teamId, owner: el.owner, team: el.team, totals:[el.week1, el.week2, el.week3, el.week4,el.week5,el.week6,el.week7,el.week8, el.week9,el.week10, el.week11, el.week12, el.week13, el.week14, el.week15, el.week16]});
            }
            
        }
        // compound scores each week (etc week2 = week1+week2)
        teamWeeklyScores.forEach(team =>{
            const index = teamRunningScores.push({teamId: team.teamId, owner: team.owner, name: team.team, totals:[]})-1;
            team.totals.reduce((a,b,i)=> {return teamRunningScores[index].totals[i] = a+b},0)
        })
        return teamRunningScores;
    }

    findObjectIndex(arr, attr, value) {
        for(let i = 0; i < arr.length; i += 1) {
            if(arr[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    async getStandingsForWeek(week: number) {
        const weeklyRunningScores = await this.teamsTotalPointsByWeek();
        console.log(weeklyRunningScores)
        const teamWeeklyStandings = weeklyRunningScores.map(team => {
            return {
                team: team.name,
                points: team.totals[week-1] - team.totals[week-2]
            }

        })
        console.log(teamWeeklyStandings)
        return teamWeeklyStandings;
    }

    async updateChallengerTotalScore(id) {
        const challengerNewScore = (await this.getScoresByChallenger(id)).reduce((prev, elem) =>prev +elem.rule.points,0)
        await this.challengerRepository.save({points: challengerNewScore, id: id});
        return challengerNewScore;
    }


}
