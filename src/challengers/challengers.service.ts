import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengerDto } from './dto/create-challenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengerRepository } from './challenger.repository';
import { Challenger } from './challenger.entity'
import { UpdateChallengerDto } from './dto/update-challenger.dto';

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

    async createChallenger(createChallengerDto: CreateChallengerDto): Promise<Challenger> {
        return await this.challengerRepository.createChallenger(createChallengerDto);
    }

    async deleteChallenger(id: number): Promise<void> {
        const result = await this.challengerRepository.delete({id});
        if (result.affected === 0){
            throw new NotFoundException(`Challenger with id '${id}' not found`)
        }
    }

    async updateChallenger(id: number, updateChallengerDto: UpdateChallengerDto): Promise<Challenger> {
        const found = await this.challengerRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`challenger with id '${id}' not found`)
        }
        await this.challengerRepository.save({...updateChallengerDto, id: id});
        return this.getChallengerById(id);

  }
}
