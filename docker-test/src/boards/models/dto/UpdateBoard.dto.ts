import { IsString } from "class-validator";
import { PeopleEntity } from "src/people/models/people.entity";
import { BoardPersonEntity } from "../boardPerson.entity";

export class UpdateBoardDto{
    @IsString()
    title: string
    people: BoardPersonEntity[]
}