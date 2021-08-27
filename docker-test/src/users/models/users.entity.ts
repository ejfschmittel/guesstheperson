import { BoardEntity } from "src/boards/models/board.entity";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";

import {PeopleEntity} from "../../people/models/people.entity"


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @OneToMany(() => PeopleEntity, people => people.owner)
    people: PeopleEntity[];

    @OneToMany(() => BoardEntity, board => board.owner)
    boards: BoardEntity[];

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }
}