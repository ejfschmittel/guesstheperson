import { UserEntity } from "src/users/models/users.entity";

export interface PeopleInterface{
    id: string,
    name: string,
    image_url: string,
    owner: UserEntity,
}