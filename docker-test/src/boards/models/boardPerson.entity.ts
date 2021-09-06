import { PeopleEntity } from "src/people/models/people.entity";
import { UserEntity } from "src/users/models/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board.entity";


@Entity()
export class BoardPersonEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    index: number;

    @ManyToOne(() => PeopleEntity, person => person.boardReferences)
    person: PeopleEntity

    // one board / multiple entities
    @ManyToOne(() => BoardEntity, board => board.people)
    board: BoardEntity;
}