import { IsNotEmpty } from 'class-validator'

export class EnterScoreDto {
    @IsNotEmpty()
    week: number;
    @IsNotEmpty()
    rule: number;
    @IsNotEmpty()
    challenger: number;


}