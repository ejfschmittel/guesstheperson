import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PeopleEntity } from './models/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PeopleEntity])
  ],
  providers: [PeopleService],
  controllers: [PeopleController]
})
export class PeopleModule {}
