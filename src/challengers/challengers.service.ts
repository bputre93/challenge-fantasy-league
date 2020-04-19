import { Injectable } from '@nestjs/common';
import { Challenger } from './challenger.model';
import { CreateChallengerDto } from './dto/create-challenger.dto';

@Injectable()
export class ChallengersService {

    private challengers: Challenger[] = [];

    getAllChallengers(): Challenger[] {
        return this.challengers;
    }

    createChallenger(createChallengerDto: CreateChallengerDto): Challenger {
        const { name, team, seasons, originalShow } = createChallengerDto
        const challenger: Challenger = {
            id: "1", //need to add uuid lib and change to uuid()
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
