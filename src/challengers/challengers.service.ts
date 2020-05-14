import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengerDto } from './dto/create-challenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengerRepository } from './challenger.repository';
import { Challenger } from './challenger.entity'
import { UpdateChallengerDto } from './dto/update-challenger.dto';
import { TeamRepository } from 'src/teams/team.repository';

@Injectable()
export class ChallengersService {
    constructor(
        @InjectRepository(ChallengerRepository)
        private challengerRepository: ChallengerRepository,
        @InjectRepository(TeamRepository)
        private teamRepository: TeamRepository,
    ) {}

    async getAllChallengers(): Promise<Challenger[]> {
        const challs = await this.challengerRepository.find({relations:["team"],order: {id: 'ASC'}});
        challs.forEach(el=>{
            delete el.team.challengers;
        })
        return challs;

    }

    async getChallengerById(id: number): Promise<Challenger> {
        const found = await this.challengerRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`challenger with id '${id}' not found`)
        }
        
        return found;
    }

    async getChallengerByName(name: string): Promise<Challenger> {
        const found = await this.challengerRepository.findOne({where:{name: name}, relations:['team']});
        if(!found) {
            throw new NotFoundException(`challenger with name '${name}' not found`)
        }
        delete found.team.challengers;
        return found;
    }

    async createChallenger(createChallengerDto: CreateChallengerDto): Promise<Challenger> {
        const id = createChallengerDto.team;
        const team = await this.teamRepository.findOne(id);
        return await this.challengerRepository.createChallenger(createChallengerDto, team);
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
