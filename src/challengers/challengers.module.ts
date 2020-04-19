import { Module } from '@nestjs/common';
import { ChallengersController } from './challengers.controller';
import { ChallengersService } from './challengers.service';

@Module({
  controllers: [ChallengersController],
  providers: [ChallengersService]
})
export class ChallengersModule {}
