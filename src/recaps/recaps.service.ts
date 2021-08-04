import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecapDto } from './dto/create-recap.dto';
import { RecapRepository } from './recap.repository';
import { Recap } from './recap.entity';

@Injectable()
export class RecapsService {
    constructor(
        @InjectRepository(RecapRepository)
        private recapRepository: RecapRepository
        ){}

    async createRecap(createRecapDto: CreateRecapDto): Promise<Recap> {
        const weeks = await this.recapRepository.getWeeks();
         if (weeks.includes(createRecapDto.week)){
             throw new BadRequestException(`Recap for week ${createRecapDto.week} already exists`)
         }

        return await this.recapRepository.createRecap(createRecapDto);
    }

    async getAllRecaps(): Promise<Recap[]> {
        return await this.recapRepository.find();
    }

    async getRecapById(id: number): Promise<Recap> {
        const found =  await this.recapRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Recap with ${id} not found`)
        }

        return found;
    }

    async getRecapByWeek(week: number): Promise<Recap> {
        const found = await this.recapRepository.findOne({where: {week: week}})

        if (!found) {
            throw new NotFoundException(`Recap from week ${week} not found`)
        }

        return found;
    }

    async deleteRecap(id: number): Promise<void> {
        const result =  await this.recapRepository.delete(id)

        if(result.affected === 0) {
            throw new NotFoundException(`recap with id '${id}' not found`)
        }
    }

}
