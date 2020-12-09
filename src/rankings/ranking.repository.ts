import { EntityRepository, Repository } from "typeorm";
import { Ranking } from "./ranking.entity";
import { CreateRankingDto } from './dto/create-ranking.dto'
import { Team } from "src/teams/team.entity";

@EntityRepository(Ranking)
export class RankingRepository extends Repository<Ranking> {

    async createWeeklyRanking(createRankingDto: CreateRankingDto, team: Team): Promise<Ranking> {
        const { week, powerRank, writeup } = createRankingDto;
        const ranking = new Ranking();
        ranking.week = week;
        ranking.team = team;
        ranking.powerRank = powerRank;
        ranking.writeup = writeup;
        await ranking.save();
        delete ranking.team.challengers;
        return ranking;
    }
}