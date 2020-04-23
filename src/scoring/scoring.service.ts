import { Injectable } from '@nestjs/common';
import { ScoringRepository } from './scoring.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Scoring } from './scoring.entity';
import { CreateRuleDto } from './dto/create-rule.dto';

@Injectable()
export class ScoringService {
    constructor(
        @InjectRepository(ScoringRepository)
        private scoringRepository: ScoringRepository
    ){}

    async getAllRules(): Promise<Scoring[]>{
        return await this.scoringRepository.find();
    }

    async createRule(createRuleDto: CreateRuleDto): Promise<Scoring>{
        return await this.scoringRepository.createRule(createRuleDto);
    }
}
