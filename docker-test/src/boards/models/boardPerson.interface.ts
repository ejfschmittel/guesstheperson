import { UserEntity } from "src/users/models/users.entity";
import { PeopleEntity } from "src/people/models/people.entity";
import { BoardEntity } from "./board.entity";

export interface PeopleInterface{
    id: string,
    index: number,
    person: PeopleEntity,
    board: BoardEntity,
}