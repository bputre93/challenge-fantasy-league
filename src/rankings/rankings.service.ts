import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { RankingRepository } from './ranking.repository';
import { TeamRepository } from '../teams/team.repository'
import { Ranking } from './ranking.entity';

@Injectable()
export class RankingsService {
    constructor(
        @InjectRepository(RankingRepository)
        private rankingRepository: RankingRepository,
        @InjectRepository(TeamRepository)
        private teamRepository: TeamRepository,
    ) {}

    async createWeeklyRanking(createRankingDto: CreateRankingDto): Promise<Ranking> {
        const team = await this.teamRepository.findOne(createRankingDto.team);

        return await this.rankingRepository.createWeeklyRanking(createRankingDto, team)
    }

    async getRankingsByWeek(week: number): Promise<Ranking[]> {
        const found =  await this.rankingRepository.find({where: {week: week}})

        if(!found.length) {
            throw new NotFoundException(`Power rankings from week ${week} not found`)
        }

        const entries = found.map(el => {
            delete el.team.challengers
            return el;
        })

        if(week !== 0) {
            //week-4 is janky and assumes monthly power rankings. Could do a loop to check for the existence of a ranking. See how this plays out.
            const prev = (await this.rankingRepository.find({where: {week: week-4}})).map(el => {return {team: el.team.id, prevRank: el.powerRank}})
            
            entries.forEach(el => {
                const teamId = el.team.id;
                prev.forEach(p => {
                    if(p.team == teamId) {
                        el.prevRank = p.prevRank
                    }
                })
            })

        }

        return entries;
    }

    async getAllRankings(): Promise<Ranking[]> {
        const all =  await this.rankingRepository.find();
        const trimmed = all.map(el => {
            delete el.team.challengers
            return el
        })

        return trimmed;
    }
}
