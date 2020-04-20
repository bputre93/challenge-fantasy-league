import { Challenger } from "./challenger.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Challenger)
export class ChallengerRepository extends Repository<Challenger> {
    

}