import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Challenger } from "src/challengers/challenger.entity";
import { Ranking } from "src/rankings/ranking.entity";

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    owner: string;

    @OneToMany(type => Challenger, challenger => challenger.team, {eager: true})
    challengers: Challenger[];

    @OneToMany(type => Ranking, ranking =>ranking.team, {eager: false})
    rankings: Ranking[];

    totalPoints: number;

}