import { PeopleEntity } from "src/people/models/people.entity";
import { UserEntity } from "src/users/models/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Board{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string

    @ManyToMany(() => PeopleEntity)
    @JoinTable()
    people: PeopleEntity[]

    @ManyToOne(() => UserEntity, user => user.people)
    owner: UserEntity;
}