import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

    @Get('/:id')
    getChallengerById(@Param('id') id: string) {
        return this.challengersService.getChallengerById(id);
    }

    @Post()
    createChallenger(@Body() createChallengerDto: CreateChallengerDto): Challenger {
        return this.challengersService.createChallenger(createChallengerDto);
    }
}
