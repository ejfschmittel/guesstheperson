import { IsString } from "class-validator";
import { PeopleEntity } from "src/people/models/people.entity";

export class UpdateBoardDto{
    @IsString()
    title: string
    people: PeopleEntity[]
}