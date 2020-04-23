import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { Scoring } from './scoring.entity';
import { CreateRuleDto } from './dto/create-rule.dto';

@Controller('scoring')
export class ScoringController {
    constructor(private scoringService: ScoringService){}

    @Get()
    getAllRules(): Promise<Scoring[]> {
        return this.scoringService.getAllRules();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRule(@Body() createRuleDto: CreateRuleDto): Promise<Scoring>{
        return this.scoringService.createRule(createRuleDto);
    }
}
