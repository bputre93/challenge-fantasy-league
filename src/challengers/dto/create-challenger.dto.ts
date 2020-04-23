import { IsNotEmpty } from 'class-validator'

export class CreateChallengerDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    team: number
    @IsNotEmpty()
    seasons: number;
    @IsNotEmpty()
    originalShow: string;

}