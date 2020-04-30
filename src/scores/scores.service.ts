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

        const challengerNewScore = challenger.points + rule.points;
        await this.challengerRepository.save({points: challengerNewScore, id: challenger.id});
        score.challenger.points = challengerNewScore;

        if(rule.id = 4 || rule.type.indexOf('Loss')) { //this is janky
            challenger.eliminated = true;
            await this.challengerRepository.save({eliminated: true, id: challenger.id})
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
        //return await this.scoreRepository.getScoresByWeek(id);
    }

    async getScoresByChallenger(id: number): Promise<Score[]> {
        return await this.scoreRepository.find({
            relations: ['challenger'],
            where: {challenger: id},
            order: {id: 'ASC'}
        })
    }

    async deleteScore(id: number): Promise<void> {
        const result = await this.scoreRepository.delete({id});

        if(result.affected === 0) {
            throw new NotFoundException(`Scoring record with id ${id} not found`)
        }
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
                const week = el.week;
                fullStandingsData[challIndex][week] += el.rule.points;
                fullStandingsData[challIndex].total += el.rule.points;
            } else if(challIndex === -1) {
                fullStandingsData.push({challenger: el.challenger.name, 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,total:0})
                const newChall = fullStandingsData.length-1;
                const week = el.week;
                fullStandingsData[newChall][week] += el.rule.points;
                fullStandingsData[newChall].total += el.rule.points;
            }
        });
        return fullStandingsData;
    }

    findObjectIndex(arr, attr, value) {
        for(let i = 0; i < arr.length; i += 1) {
            if(arr[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }


}
