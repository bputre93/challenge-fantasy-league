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
        const teamList =  await this.teamRepository.find();

        teamList.forEach(team => {
            team.totalPoints = team.challengers.reduce((prev, elem) =>prev +elem.points,0);
        })

        return teamList;
    }

    async getTeamById(id: number): Promise<Team> {
        const team = await this.teamRepository.findOne(id)

        if(!team) {
            throw new NotFoundException(`challenger with id '${id}' not found`)
        }
        team.totalPoints = team.challengers.reduce((prev, elem) =>prev +elem.points,0);
        
        return team;
    }

    async getStandings() {
        const teams = await this.getAllTeams();
        const sortedTeams = teams.sort((a,b)=>{
            return b.totalPoints - a.totalPoints;
        });

        const standings = sortedTeams.map((team,index) => {

            return {rank: index+1, name: team.name, owner: team.owner, points: team.totalPoints}
        })
        return standings;
    }

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamRepository.createTeam(createTeamDto);
    }
}

