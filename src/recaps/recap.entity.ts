import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recap extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    week: number

    @Column()
    writeup: string

    @Column()
    mvp: string;

    @Column({nullable: true})
    eliminations: string;

    @Column({nullable: true})
    skulls: string;

    @Column()
    episodeTitle: string;
}