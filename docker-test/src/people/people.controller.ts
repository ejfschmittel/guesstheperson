import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {PeopleInterface} from "./models/people.interface"


import {editFileName, imageFileFilter} from "src/utils/image.utils"
import { PeopleService } from './people.service';



@Controller('people')
export class PeopleController {

    constructor(private peopleService: PeopleService){}

    @Post()
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
        })
    }   

    @Get()
    getPeople(): Promise<PeopleInterface[]>{
        return this.peopleService.findAll();
    }

    
}
