import { Team } from "./team.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTeamDto } from "./dto/create-team-dto";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team>{

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        const { name, owner } = createTeamDto;
        const team = new Team();
            team.name = name;
            team.owner = owner;

        await team.save();
        return team;

    }

}