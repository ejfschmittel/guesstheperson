import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/users.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from './models/board.entity';
import { createBoardDto } from './models/dto/CreateBoard.dto';
import { UpdateBoardDto } from './models/dto/UpdateBoard.dto';
import {BoardInterface} from "./models/board.interface"
import { BoardPersonEntity } from './models/boardPerson.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardEntity) private boardRepositiory: Repository<BoardEntity>,
        @InjectRepository(BoardPersonEntity) private boardPeopleRespository: Repository<BoardPersonEntity>,
    ){}


    create(createBoardDto: createBoardDto, user: UserEntity){
        const board = new BoardEntity();
        board.title = createBoardDto.title;
        board.owner = user
        return this.boardRepositiory.save(board);
    } 


    async findOne(id: string): Promise<BoardEntity>{
        return await this.boardRepositiory.findOne({
            where: {id},
            relations: ["people", "people.person"]
        })
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

    async delete(id: string): Promise<string>{
        await this.boardRepositiory.delete(id)
        return id;
    }

    async updateBoard(id: string, updateBoardDto: UpdateBoardDto): Promise<BoardEntity>{
        console.log("update board")
        const board = await this.findOne(id)


        console.log(board)

        console.log(updateBoardDto)
        
        const {title, sharing_enabled, people} = updateBoardDto;

        // remove all people
        board.people.forEach((person, idx) => {
            this.boardPeopleRespository.delete(person.id)
        })

        // recreate people board connections with corrected index
        let newPeople = []
        for(let i = 0; i < people.length; i++){
            const person = people[i];
            const boardPersonEntity = await this.boardPeopleRespository.save({
                index: i,
                person: person,
                board: board,
            })
            newPeople.push(boardPersonEntity)
        }
       
        // return updated board 

        const updatedBoard = {
            ...board, // existing fields
            title, // updated fields
            sharing_enabled: sharing_enabled ? sharing_enabled : false,
            people: newPeople,
        }

        console.log(updatedBoard)

        return this.boardRepositiory.save(updatedBoard);
    }
}
