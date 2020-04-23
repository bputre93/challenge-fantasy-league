import { Repository, EntityRepository } from "typeorm";
import { Scoring } from "./scoring.entity";
import { CreateRuleDto } from "./dto/create-rule.dto";

@EntityRepository(Scoring)
export class ScoringRepository extends Repository<Scoring> {

    async createRule(createRuleDto: CreateRuleDto):Promise<Scoring>{
        const { type, points } = createRuleDto;
        const rule = new Scoring();
        rule.type = type;
        rule.points = points;

        await rule.save();
        return rule;
    }

}