import { UserEntity } from "src/users/models/users.entity";
import { PeopleEntity } from "src/people/models/people.entity";

export interface BoardInterface{
    id: string,
    title: string,
    people: string,
    owner: UserEntity,
    sharing_enabled: boolean,
}