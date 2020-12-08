import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecapRepository } from './recap.repository';
import { RecapsController } from './recaps.controller';
import { RecapsService } from './recaps.service';

@Module({
  controllers: [RecapsController],
  providers: [RecapsService],
  imports: [
    TypeOrmModule.forFeature([RecapRepository])
  ],
  exports: [RecapsService]
})
export class RecapsModule {}
