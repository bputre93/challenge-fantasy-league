import { IsNotEmpty } from 'class-validator'

export class CreateRuleDto {
    @IsNotEmpty()
    type: string;
    @IsNotEmpty()
    points: number

}