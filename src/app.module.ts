import { Module } from '@nestjs/common';
import { ChallengersModule } from './challengers/challengers.module';


@Module({
  imports: [ChallengersModule]
})
export class AppModule {}
