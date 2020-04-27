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


}
