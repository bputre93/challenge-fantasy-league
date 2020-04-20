import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengerDto } from './dto/create-challenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengerRepository } from './challenger.repository';
import { Challenger } from './challenger.entity'

@Injectable()
export class ChallengersService {
    constructor(
        @InjectRepository(ChallengerRepository)
        private challengerRepository: ChallengerRepository,
    ) {}

    private challengers: Challenger[] = [];

    async getAllChallengers(): Promise<Challenger[]> {
        return await this.challengerRepository.find();
    }

    async getChallengerById(id: number): Promise<Challenger> {
        const found = await this.challengerRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`challenger with id '${id}' not found`)
        }
        
        return found;
    }

    createChallenger(createChallengerDto: CreateChallengerDto): Promise<Challenger> {
        return this.challengerRepository.createChallenger(createChallengerDto);
    }
}
