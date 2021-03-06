import { BoardPersonEntity } from "src/boards/models/boardPerson.entity";
import { UsersModule } from "src/users/users.module";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {UserEntity} from "../../users/models/users.entity"


@Entity()
export class PeopleEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    image_url: string;

    @ManyToOne(() => UserEntity, user => user.people)
    @JoinColumn()
    owner: UserEntity;

    @OneToMany(() => BoardPersonEntity, boardEntity => boardEntity.person)
    boardReferences: BoardPersonEntity[]; 

}