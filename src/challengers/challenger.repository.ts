import { Challenger } from "./challenger.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateChallengerDto } from "./dto/create-challenger.dto";
import { Team } from "src/teams/team.entity";

@EntityRepository(Challenger)
export class ChallengerRepository extends Repository<Challenger> {
    async createChallenger(createChallengerDto: CreateChallengerDto, team: Team): Promise<Challenger> {
        const { name, seasons, originalShow, draftPosition } = createChallengerDto
        const challenger = new Challenger();
            challenger.name = name;
            challenger.seasons = seasons;
            challenger.originalShow = originalShow;
            challenger.points = 0;
            challenger.redSkulls = 0;
            challenger.finals = false;
            challenger.eliminated = false;
            challenger.draftPosition = draftPosition;
            challenger.team = team;
            await challenger.save();
            delete challenger.team.challengers;
            return challenger;
     }
        
}
