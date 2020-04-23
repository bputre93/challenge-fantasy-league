import { Module } from '@nestjs/common';
import { ChallengersModule } from './challengers/challengers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TeamsModule } from './teams/teams.module';
import { ScoresModule } from './scores/scores.module';
import { ScoringModule } from './scoring/scoring.module';


@Module({
  imports: [
    ChallengersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TeamsModule,
    ScoresModule,
    ScoringModule
  ]
})
export class AppModule {}
