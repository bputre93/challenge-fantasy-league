import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { ChallengersService } from './challengers.service';
import { Challenger } from './challenger.entity';
import { CreateChallengerDto } from './dto/create-challenger.dto';
import { UpdateChallengerDto } from './dto/update-challenger.dto';

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

    @Get('/name/:name')
    getChallengerByName(@Param('name') name: string): Promise<Challenger> {
        return this.challengersService.getChallengerByName(name);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createChallenger(@Body() createChallengerDto: CreateChallengerDto): Promise<Challenger> {
        return this.challengersService.createChallenger(createChallengerDto);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateChallenger(@Param('id', ParseIntPipe) id:number, @Body() updateChallengerDto: UpdateChallengerDto): Promise<Challenger> {
        return this.challengersService.updateChallenger(id, updateChallengerDto)
    }

    @Delete('/:id')
    deleteChallenger(@Param('id',ParseIntPipe) id: number):Promise<void> {
        return this.challengersService.deleteChallenger(id)
    }
}
