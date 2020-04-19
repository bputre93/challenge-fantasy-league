import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChallengersService } from './challengers.service';
import { Challenger } from './challenger.model';
import { CreateChallengerDto } from './dto/create-challenger.dto';

@Controller('challengers')
export class ChallengersController {
    constructor(private challengersService: ChallengersService){}

    @Get()
    getAllChallengers(): Challenger[] {
        return this.challengersService.getAllChallengers();
    }

    @Post()
    createChallenger(@Body() createChallengerDto: CreateChallengerDto): Challenger {
        return this.challengersService.createChallenger(createChallengerDto);
    }
}
