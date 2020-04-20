import { Module } from '@nestjs/common';
import { ChallengersModule } from './challengers/challengers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [
    ChallengersModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ]
})
export class AppModule {}
