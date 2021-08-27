import { IsNumber, IsString } from "class-validator";
import { UserEntity } from "src/users/models/users.entity";

export class CreatePersonDto{
    @IsString()
    image_url: string

    @IsString()
    name: string;

    @IsNumber()
    owner: UserEntity;
}