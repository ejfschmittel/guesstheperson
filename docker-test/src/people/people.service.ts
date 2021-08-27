import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/users.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './models/dtos/CreatePerson.dto';
import { PeopleEntity } from './models/people.entity';
import { PeopleInterface } from './models/people.interface';

@Injectable()
export class PeopleService {

    constructor(
        @InjectRepository(PeopleEntity) private peopleRespositiory: Repository<PeopleEntity>,
    ){}

    createPerson(personData: CreatePersonDto): any{
        return this.peopleRespositiory.save(personData) 
    }

    async findAll(): Promise<PeopleInterface[]>{
        return await this.peopleRespositiory.find()
    }
}
