import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team-dto';
import { Team } from './team.entity';

@Controller('teams')
export class TeamsController {
    constructor( private teamsService: TeamsService) {}

    @Get()
    getAllTeams(): Promise<Team[]>{
        return this.teamsService.getAllTeams();
    }

    @Get('/:id')
    getTeamById(@Param('id', ParseIntPipe) id:number): Promise<Team> {
        return this.teamsService.getTeamById(id);
    }

    @Post()
    createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamsService.createTeam(createTeamDto);

    }
}