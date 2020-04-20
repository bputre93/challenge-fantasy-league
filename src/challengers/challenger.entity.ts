import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Challenger extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    seasons: number;

    @Column()
    team: string;

    @Column()
    points: number;

    @Column()
    finals: boolean;

    @Column()
    eliminated: boolean;
}