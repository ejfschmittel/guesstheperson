import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/users.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from './models/board.entity';
import { createBoardDto } from './models/dto/CreateBoard.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardEntity) private boardRepositiory: Repository<BoardEntity>,
    ){}


    create(createBoardDto: createBoardDto, user: UserEntity){
        const board = new BoardEntity();
        board.title = createBoardDto.title;
        board.owner = user
        return this.boardRepositiory.save(board);
    } 


    async findOne(id: string): Promise<BoardEntity>{
        return await this.boardRepositiory.findOne(id)
    }

    async findWithOwner(id: string): Promise<BoardEntity>{
        return await this.boardRepositiory.findOne({
            where: {id},
            relations: ["owner"]
        })
    }

    async findAll(): Promise<BoardEntity[]>{
        return await this.boardRepositiory.find({
            relations: ["owner", "people"]
        })
    }

    async delete(id: string){
        await this.boardRepositiory.delete(id)
        return id;
    }
}
