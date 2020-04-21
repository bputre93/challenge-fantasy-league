import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Challenger } from "src/challengers/challenger.entity";

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

}