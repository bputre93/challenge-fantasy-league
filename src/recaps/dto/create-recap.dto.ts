import { IsNotEmpty } from "class-validator";

export class CreateRecapDto {
    @IsNotEmpty()
    week: number;
    @IsNotEmpty()
    writeup: string;

    @IsNotEmpty()
    episodeTitle: string;

    @IsNotEmpty()
    mvp: string;

    skulls: string;

    eliminations: string;
}