import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {PeopleInterface} from "./models/people.interface"

import {join} from "path"
import {editFileName, imageFileFilter} from "src/utils/image.utils"
import { PeopleService } from './people.service';
import { PersonOwnerGuard } from './guards/people.guard';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@Controller('people')
export class PeopleController {

    constructor(private peopleService: PeopleService){}

    @Post()
    @UseGuards(JWTAuthGuard)
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    createPerson(@UploadedFile() image, @Body("name") name: string, @Req() request): any{
        console.log(request)
        return this.peopleService.createPerson({
            image_url: image.path,
            name: name,
            owner: request.user.id
        })
    }   



    @Get()
    getPeople(): Promise<PeopleInterface[]>{
        return this.peopleService.findAll();
    }

    @Get(":id/delete")
    deletePerson(@Param("id") id: string): any{
        return null
    }

    @Get(":id")
    @UseGuards(JWTAuthGuard,PersonOwnerGuard)
    getPerson(@Param("id") id: string): any{
        return this.peopleService.findOne(id);
    }

    @Post(":id")
    updatePerson(@Param("id") id: string): any{
        return null;
    }

  


    
}
