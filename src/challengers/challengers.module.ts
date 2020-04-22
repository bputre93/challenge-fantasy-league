import { Module } from '@nestjs/common';
import { ChallengersController } from './challengers.controller';
import { ChallengersService } from './challengers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengerRepository } from './challenger.repository';
import { TeamsModule } from 'src/teams/teams.module';
import { TeamsService } from 'src/teams/teams.service';
import { TeamRepository } from 'src/teams/team.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengerRepository,TeamRepository]),
    TeamsModule
  ],
  controllers: [ChallengersController],
  providers: [ChallengersService, TeamsService]
})
export class ChallengersModule {}
