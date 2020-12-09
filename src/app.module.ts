import { Module } from '@nestjs/common';
import { ChallengersModule } from './challengers/challengers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TeamsModule } from './teams/teams.module';
import { ScoresModule } from './scores/scores.module';
import { ScoringModule } from './scoring/scoring.module';
import { RecapsModule } from './recaps/recaps.module';
import { RankingsModule } from './rankings/rankings.module';


@Module({
  imports: [
    ChallengersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TeamsModule,
    ScoresModule,
    ScoringModule,
    RecapsModule,
    RankingsModule
  ]
})
export class AppModule {}
