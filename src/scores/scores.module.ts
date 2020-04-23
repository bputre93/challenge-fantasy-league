import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreRepository } from './score.repository';
import { ScoringModule } from 'src/scoring/scoring.module';
import { ScoringRepository } from 'src/scoring/scoring.repository';
import { ScoringService } from 'src/scoring/scoring.service';
import { ChallengerRepository } from 'src/challengers/challenger.repository';
import { ChallengersModule } from 'src/challengers/challengers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScoreRepository, ScoringRepository, ChallengerRepository]),
    ScoringModule,
    ChallengersModule
  ],
  controllers: [ScoresController],
  providers: [ScoresService, ScoringService]
})
export class ScoresModule {}
