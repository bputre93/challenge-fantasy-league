import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Team } from "src/teams/team.entity";

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

    @ManyToOne(type=> Team, team => team.challengers, {eager: false})
    team: Team;

    // @Column()
    // teamId: number;
}