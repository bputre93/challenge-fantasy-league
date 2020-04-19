import { Module } from '@nestjs/common';
import { ChallengersModule } from './challengers/challengers.module';
import { ChallengersService } from './challengers/challengers.service';


@Module({
  imports: [ChallengersModule],
  providers: [ChallengersService]
})
export class AppModule {}
