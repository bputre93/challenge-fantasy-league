import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecapsService } from './recaps.service';
import { CreateRecapDto } from './dto/create-recap.dto';
import { Recap } from './recap.entity';

@Controller('recaps')
export class RecapsController {
    constructor(private recapsService: RecapsService) {}

    @Get()
    getAllRecaps(): Promise<Recap[]> {
        return this.recapsService.getAllRecaps();
    }

    @Get('/:id')
    getRecapById(@Param('id') id: number): Promise<Recap> {
        return this.recapsService.getRecapById(id);
    }

    @Get('/week/:week')
    getRecapByName(@Param('week') week: number): Promise<Recap> {
        return this.recapsService.getRecapByWeek(week);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRecap(@Body() createRecapDto: CreateRecapDto): Promise<Recap> {
        return this.recapsService.createRecap(createRecapDto)
    }

    @Delete('/:id')
    deleteRecap(@Param('id',ParseIntPipe) id: number): Promise<void> {
        return this.recapsService.deleteRecap(id);
    }

}
