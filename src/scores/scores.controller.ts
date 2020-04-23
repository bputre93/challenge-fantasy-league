import { Controller, Post, Body, Get } from '@nestjs/common';
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

    @Get()
    getAllScores(): Promise<Score[]> {
        return this.scoresService.getAllScores();
    }
}
