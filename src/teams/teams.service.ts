import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository'
import { CreateTeamDto } from './dto/create-team-dto';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(TeamRepository)
        private teamRepository: TeamRepository,
    ) {}

    async getAllTeams(): Promise<Team[]> {
        return await this.teamRepository.find();
    }

    async getTeamById(id: number): Promise<Team> {
        const found = await this.teamRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`challenger with id '${id}' not found`)
        }
        
        return found;
    }

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamRepository.createTeam(createTeamDto);
    }
}

