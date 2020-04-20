import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ChallengersService } from './challengers.service';
import { Challenger } from './challenger.entity';
import { CreateChallengerDto } from './dto/create-challenger.dto';

@Controller('challengers')
export class ChallengersController {
    constructor(private challengersService: ChallengersService){}

    @Get()
    getAllChallengers(): Promise<Challenger[]> {
        return this.challengersService.getAllChallengers();
    }

    @Get('/:id')
    getChallengerById(@Param('id', ParseIntPipe) id: number): Promise<Challenger> {
        return this.challengersService.getChallengerById(id);
    }

    @Post()
    createChallenger(@Body() createChallengerDto: CreateChallengerDto): Promise<Challenger> {
        return this.challengersService.createChallenger(createChallengerDto);
    }
}
