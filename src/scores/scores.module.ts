import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreRepository } from './score.repository';
import { ScoringModule } from 'src/scoring/scoring.module';
import { ScoringRepository } from 'src/scoring/scoring.repository';
import { ScoringService } from 'src/scoring/scoring.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScoreRepository, ScoringRepository]),
    ScoringModule
  ],
  controllers: [ScoresController],
  providers: [ScoresService, ScoringService]
})
export class ScoresModule {}
