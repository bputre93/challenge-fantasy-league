import { Module } from '@nestjs/common';
import { ChallengersController } from './challengers.controller';
import { ChallengersService } from './challengers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengerRepository } from './challenger.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengerRepository])
  ],
  controllers: [ChallengersController],
  providers: [ChallengersService]
})
export class ChallengersModule {}
