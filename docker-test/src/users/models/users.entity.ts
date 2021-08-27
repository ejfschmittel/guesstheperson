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

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }
}