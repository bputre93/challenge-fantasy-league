import { Repository, EntityRepository } from "typeorm";
import { Score } from "./score.entity";
import { EnterScoreDto } from "./dto/enter-score.dto";
import { Scoring } from "src/scoring/scoring.entity";
import { Challenger } from "src/challengers/challenger.entity";

@EntityRepository(Score)
export class ScoreRepository extends Repository<Score> {

    async enterWeeklyScore(enterScoreDto: EnterScoreDto, rule: Scoring, challenger: Challenger): Promise<Score> {
       const {week} = enterScoreDto;
       const score = new Score();
       score.week = week;
       score.rule = rule;
       score.challenger = challenger;
       await score.save();

       return score;

    }
}