import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from 'src/teams/team.repository';
import { RankingRepository } from './ranking.repository';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';

@Module({
  controllers: [RankingsController],
  providers: [RankingsService],
  imports: [
    TypeOrmModule.forFeature([RankingRepository, TeamRepository])
  ],
  exports: [RankingsService]
})
export class RankingsModule {}
