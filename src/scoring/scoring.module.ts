import { Module } from '@nestjs/common';
import { ScoringController } from './scoring.controller';
import { ScoringService } from './scoring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringRepository } from './scoring.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScoringRepository])
  ],
  controllers: [ScoringController],
  providers: [ScoringService],
  exports:[ScoringService]
})
export class ScoringModule {}
