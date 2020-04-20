import { Challenger } from "./challenger.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateChallengerDto } from "./dto/create-challenger.dto";

@EntityRepository(Challenger)
export class ChallengerRepository extends Repository<Challenger> {
    async createChallenger(createChallengerDto: CreateChallengerDto): Promise<Challenger> {
        const { name, team, seasons, originalShow } = createChallengerDto
        const challenger = new Challenger();
            challenger.name = name;
            challenger.team = team;
            challenger.seasons = seasons;
            challenger.originalShow = originalShow;
            challenger.points = 0;
            challenger.finals = false;
            challenger.eliminated = false;
            await challenger.save();

            return challenger;
        } 
    }
