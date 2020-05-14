import { IsNotEmpty, IsIn } from 'class-validator';
import {Sex} from '../chall-sex-enum';

export class CreateChallengerDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    team: number
    @IsNotEmpty()
    seasons: number;
    @IsNotEmpty()
    originalShow: string;
    @IsNotEmpty()
    draftPosition: number;
    @IsNotEmpty()
    imageUrl: string;
    @IsNotEmpty()
    @IsIn([Sex.FEMALE, Sex.MALE])
    sex: Sex;
}

