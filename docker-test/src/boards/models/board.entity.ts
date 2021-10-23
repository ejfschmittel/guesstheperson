import { PeopleEntity } from "src/people/models/people.entity";
import { UserEntity } from "src/users/models/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardPersonEntity } from "./boardPerson.entity";


@Entity()
export class BoardEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string

    @OneToMany(() => BoardPersonEntity, boardPerson => boardPerson.board, {cascade: ['remove']})
    people: BoardPersonEntity[]

    @ManyToOne(() => UserEntity, user => user.people)
    owner: UserEntity;

    // link generated link
    @Column('boolean', {default: false})
    sharing_enabled: boolean
}