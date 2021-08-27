import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './models/dto/CreateUser.dto';
import { LoginUserDto } from './models/dto/LoginUser.dto';
import { UserInterface } from './models/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<UserInterface>{
        return this.userService.create(createUserDto)
    }
    
    @Post('login')
    @HttpCode(200)
    login(@Body() loginUserDto: LoginUserDto): Observable<Object>{
        return this.userService.login(loginUserDto).pipe(
            map((jwt: string) => {
                return {
                    access_token: jwt,
                    token_type: "JWT",
                    expires_in: 10000,
                }
            })
        )
    }

    @UseGuards(JWTAuthGuard)
    @Get()
    findAll(@Req() request): Observable<UserInterface[]>{
        console.log(request.user)
        return this.userService.findAll()
    }
}
