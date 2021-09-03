import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { createBoardDto } from './models/dto/CreateBoard.dto';
import { UpdateBoardDto } from './models/dto/UpdateBoard.dto';

@Controller('boards')
export class BoardsController {

    constructor(private readonly boardsService:BoardsService){}


    @Post()
    @UseGuards(JWTAuthGuard)
    createBoard(@Body() createBoardDto: createBoardDto, @Req() req){
        console.log(createBoardDto)
        return this.boardsService.create(createBoardDto, req.user);
    }

    @Get()
    getAllBoards(){
        return this.boardsService.findAll(); 
    }

    @Get(":id")
    getBoard(@Param("id") id: string){
        return this.boardsService.findOne(id); 
    }

    @Put(":id")
    updateBoard(@Param("id") id: string, @Body() updateBoardDto: UpdateBoardDto){

    }

    @Delete(":id")
    deleteBoard(@Param("id") id: string){
        return this.boardsService.delete(id);
    }
}
