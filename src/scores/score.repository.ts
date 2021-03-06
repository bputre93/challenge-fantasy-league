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

    async getScoresByWeek(week: number): Promise<Score[]> {
        const query = this.createQueryBuilder('score')
        query.where('score.week = :week',{week})
        const sql = await query.getQuery();
        console.log(sql);
        const scores = await query.getMany();
        return scores;
    }

    async getCountsByRuleId() {
        const query = this.createQueryBuilder('score')
        .select("score.rule AS rule")
        .addSelect("COUNT(*) AS count")
        .groupBy("score.rule")
        const counts = await query.getRawMany();
        return counts;
    }

    async deleteAllScores() {
        const scoreIds = await this.createQueryBuilder('score')
        .select("score.id")
        .execute();

        if (scoreIds.length === 0) {
            return
        }

        const scoreIdsArr = scoreIds.map(el => {
            return el.score_id
        })

        this.createQueryBuilder('score')
        .delete()
        .where('score.id IN (:...ids)', { ids: scoreIdsArr })
        .execute()
    }
}