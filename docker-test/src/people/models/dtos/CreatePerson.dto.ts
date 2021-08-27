import { IsString } from "class-validator";

export class CreatePersonDto{
    @IsString()
    image_url: string

    @IsString()
    name: string;
}