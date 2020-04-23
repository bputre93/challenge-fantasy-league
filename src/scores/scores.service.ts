import { Injectable } from '@nestjs/common';
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
        private challengerRepository: ChallengerRepository
    )
        {}

    async enterWeeklyScore(enterScoreDto: EnterScoreDto): Promise<Score> {
        const rule = await this.scoringRepository.findOne(enterScoreDto.rule);
        const challenger = await this.challengerRepository.findOne(enterScoreDto.challengerId);
        return this.scoreRepository.enterWeeklyScore(enterScoreDto, rule, challenger);
    }

    async getAllScores(): Promise<Score[]> {
        return await this.scoreRepository.find();
    }


}
