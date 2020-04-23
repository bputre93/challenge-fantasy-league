import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Score } from "src/scores/score.entity";
import { Challenger } from "src/challengers/challenger.entity";

@Entity()
export class Scoring extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    points: number;

    @OneToMany(type=>Score, score=> score.rule,{eager:false})
    instances: Score[];
    
}
