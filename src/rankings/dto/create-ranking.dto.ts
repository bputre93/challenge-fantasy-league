import { IsIn, IsNotEmpty } from "class-validator";

export class CreateRankingDto {
    @IsNotEmpty()
    week: number;

    @IsNotEmpty()
    team: number

    @IsIn([1,2,3,4,5,6,7])
    powerRank: number

    writeup: string;

}