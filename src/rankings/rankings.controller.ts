import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { Ranking } from './ranking.entity';
import { RankingsService } from './rankings.service';

@Controller('rankings')
export class RankingsController {
    constructor(private rankingsService: RankingsService) {}

    @Get()
    getAllRankings(): Promise<Ranking[]> {
        return this.rankingsService.getAllRankings();
    }

    @Get('/week/:week')
    getRankingsByWeek(@Param('week') week: number): Promise<Ranking[]> {
        return this.rankingsService.getRankingsByWeek(week);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createWeeklyRanking(@Body() createRankingDto: CreateRankingDto): Promise<Ranking> {
        return this.rankingsService.createWeeklyRanking(createRankingDto);
    }


}
