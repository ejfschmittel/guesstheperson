import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './people/people.module';
import { BoardsModule } from './boards/boards.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    PeopleModule,
    BoardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
