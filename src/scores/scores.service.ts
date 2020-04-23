import { Injectable } from '@nestjs/common';
import { ScoreRepository } from './score.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterScoreDto } from './dto/enter-score.dto';
import { Score } from './score.entity';
import { ScoringRepository } from 'src/scoring/scoring.repository';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(ScoreRepository)
        private scoreRepository: ScoreRepository,
        @InjectRepository(ScoringRepository)
        private scoringRepository: ScoringRepository
    )
        {}

    async enterWeeklyScore(enterScoreDto: EnterScoreDto): Promise<Score> {
        const rule = await this.scoringRepository.findOne(enterScoreDto.rule);
        return this.scoreRepository.enterWeeklyScore(enterScoreDto, rule);
    }

    async getAllScores(): Promise<Score[]> {
        return await this.scoreRepository.find();
    }


}
