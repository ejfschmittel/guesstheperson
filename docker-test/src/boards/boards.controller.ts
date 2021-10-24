import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Put, Req, UseGuards, HttpStatus} from '@nestjs/common';
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
        return this.boardsService.create(createBoardDto, req.user);
    }

    @Get()
    getAllBoards(){
        return this.boardsService.findAll(); 
    }

    @Get(":id")
    async getBoard(@Param("id") id: string){
        const board = await this.boardsService.findOne(id); 
        if(board) return board;

        throw new HttpException(`Board with id '${id}' not found.`, HttpStatus.NOT_FOUND);
    }

    @Put(":id")
    updateBoard(@Param("id") id: string, @Body() updateBoardDto: UpdateBoardDto){
        return this.boardsService.updateBoard(id, updateBoardDto)
    }

    @Delete(":id")
    async deleteBoard(@Param("id") id: string){
        this.boardsService.delete(id);
        return {id}
    }

   
}
