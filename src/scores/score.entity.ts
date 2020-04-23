import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Scoring } from "src/scoring/scoring.entity";

@Entity()
export class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    week: number;

    @ManyToOne(type=>Scoring,rule=> rule.instances, {eager: false})
    rule: Scoring;

}