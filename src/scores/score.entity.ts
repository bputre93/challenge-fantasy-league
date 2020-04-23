import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Scoring } from "src/scoring/scoring.entity";
import { Challenger } from "src/challengers/challenger.entity";

@Entity()
export class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    week: number;

    @ManyToOne(type=>Scoring,rule=> rule.instances, {eager: true})
    rule: Scoring;

    @ManyToOne(type=>Challenger, challenger=>challenger.scores, {eager: true})
    challenger: Challenger

}