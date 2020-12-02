import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { Score } from './score.entity';
import { EnterScoreDto } from './dto/enter-score.dto';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
    constructor(private scoresService: ScoresService){}

    @Post()
    enterWeeklyScore(@Body() enterScoreDto: EnterScoreDto): Promise<Score> {
        return this.scoresService.enterWeeklyScore(enterScoreDto);
    }

    @Get('/teamTotalPointsByWeek')
    getTeamsTotalPointsByWeek() {
        return this.scoresService.teamsTotalPointsByWeek();
    }

    @Get('/challengerWeeklyScores')
    getChallengerWeeklyScores(){
        return this.scoresService.challengerWeeklyScores();
    }

    @Get('/countsByRule')
    getCountsOfEachRule(){
        return this.scoresService.getCountsOfEachRule();
    }

    @Delete('/deleteAll')
    deleteAllScores(): Promise<void> {
        return this.scoresService.deleteAllScores();
    }

    @Get('/:id')
    getScoreById(@Param('id', ParseIntPipe) id: number): Promise<Score> {
        return this.scoresService.getScoreById(id);
    }

    @Get('/week/:id')
    getScoresByWeek(@Param('id', ParseIntPipe) id: number): Promise<Score[]> {
        return this.scoresService.getScoresByWeek(id);
    }

    @Get('/challenger/:id')
    getScoresByChallenger(@Param('id', ParseIntPipe) id: number): Promise<Score[]> {
        return this.scoresService.getScoresByChallenger(id);
    }

    @Get()
    getAllScores(): Promise<Score[]> {
        return this.scoresService.getAllScores();
    }

    @Delete('/:id')
    deleteScore(@Param('id',ParseIntPipe) id:number): Promise<void> {
        return this.scoresService.deleteScore(id);
    }

}
