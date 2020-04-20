import { Injectable } from '@nestjs/common';
import { Challenger } from './challenger.model';
import { CreateChallengerDto } from './dto/create-challenger.dto';
import * as uuid from 'uuid/v1';

@Injectable()
export class ChallengersService {

    private challengers: Challenger[] = [];

    getAllChallengers(): Challenger[] {
        return this.challengers;
    }

    getChallengerById(id: string): Challenger {
        return this.challengers.find(chall => chall.id === id);
    }

    createChallenger(createChallengerDto: CreateChallengerDto): Challenger {
        const { name, team, seasons, originalShow } = createChallengerDto
        const challenger: Challenger = {
            id: uuid(),
            name,
            team,
            seasons,
            originalShow,
            points: 0,
            finals: false,
            eliminated: false
        } 
        this.challengers.push(challenger)
        return challenger;
    }
}
