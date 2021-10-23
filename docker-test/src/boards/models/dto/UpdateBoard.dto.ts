import { IsString } from "class-validator";
import { PeopleEntity } from "src/people/models/people.entity";
import { BoardPersonEntity } from "../boardPerson.entity";

export class UpdateBoardDto{
    @IsString()
    title: string
    sharing_enabled: boolean
    people: BoardPersonEntity[]
}