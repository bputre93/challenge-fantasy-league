import { Repository, EntityRepository } from "typeorm";
import { Score } from "./score.entity";
import { EnterScoreDto } from "./dto/enter-score.dto";
import { Scoring } from "src/scoring/scoring.entity";

@EntityRepository(Score)
export class ScoreRepository extends Repository<Score> {

    async enterWeeklyScore(enterScoreDto: EnterScoreDto, rule: Scoring): Promise<Score> {
       const {week, challenger} = enterScoreDto;
       const score = new Score();
       score.week = week;
       score.rule = rule;
       await score.save();
       delete score.rule.instances;

       return score;

    }
}