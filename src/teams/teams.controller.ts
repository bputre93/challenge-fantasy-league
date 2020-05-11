import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team-dto';
import { Team } from './team.entity';
import { UpdateTeamDto } from './dto/update-team-dto';

@Controller('teams')
export class TeamsController {
    constructor( private teamsService: TeamsService) {}

    @Get('/standings')
    getStandings() {
        return this.teamsService.getStandings();
    }

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

    @Patch('/:id')
    updateTeam(@Param('id',ParseIntPipe) id: number, @Body() updateTeamDto: UpdateTeamDto): Promise<Team> {
        return this.teamsService.updateTeam(id,updateTeamDto)
    }

}