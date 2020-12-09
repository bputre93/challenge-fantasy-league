import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Team } from '../teams/team.entity';

@Entity()
export class Ranking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    week: number

    @ManyToOne(type=> Team, team => team.rankings, {eager: true})
    team: Team;

    @Column()
    powerRank: number

    @Column({nullable: true})
    writeup: string

}