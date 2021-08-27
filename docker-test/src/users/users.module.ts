import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PeopleModule} from 'src/people/people.module';
import { PeopleEntity } from "src/people/models/people.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PeopleEntity]),
    AuthModule,
    PeopleModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
