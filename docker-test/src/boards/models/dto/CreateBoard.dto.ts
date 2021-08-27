import { IsString } from "class-validator";

export class createBoardDto{
    @IsString()
    title: string
}