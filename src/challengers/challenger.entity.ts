import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Team } from "src/teams/team.entity";
import { Score } from "src/scores/score.entity";

@Entity()
export class Challenger extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    seasons: number;

    @Column()
    originalShow: string;

    @Column()
    points: number;

    @Column()
    finals: boolean;

    @Column()
    eliminated: boolean;

    @Column()
    draftPosition: number;

    @ManyToOne(type=> Team, team => team.challengers, {eager: false})
    team: Team;

    @OneToMany(type=>Score, score =>score.challenger, {eager: false})
    scores: Challenger[];

}