import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import {map, switchMap} from "rxjs/operators"
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/CreateUser.dto';
import { LoginUserDto } from './models/dto/LoginUser.dto';
import { UserEntity } from './models/users.entity';
import { UserInterface } from './models/users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) 
        private usersRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}


    create(user: CreateUserDto): Observable<UserInterface>{
        return this.mailExists(user.email).pipe(
            switchMap((exists: boolean) => {
                if(!exists){
                    return this.authService.hashPassword(user.password).pipe(
                        switchMap((passwordHash:string) => {
                            user.password = passwordHash;
                            return from(this.usersRepository.save(user)).pipe(
                                map((savedUser: UserInterface) => {
                                    const {password, ...user} = savedUser;
                                    return user;
                                })
                            )
                        })
                    )
                }else{
                    throw new HttpException("Email arleady in use", HttpStatus.CONFLICT);
                }
            })
        )   
    }

    login(loginUserDto: LoginUserDto): Observable<string>{
        return this.findUserByEmail(loginUserDto.email).pipe(
            switchMap((user: UserInterface) => {
                if(user){
                    return this.validatePassword(loginUserDto.password, user.password).pipe(
                        switchMap((passwordMatches: boolean) => {
                            if(passwordMatches){
                                return this.findOne(user.id).pipe(
                                    switchMap((user: UserInterface) => {
                                        return this.authService.generateJWT(user);
                                    })
                                )
                            }else{
                                throw new HttpException("Incorrect email or password.", HttpStatus.UNAUTHORIZED)
                            }
                        })
                    )
                }else{
                    throw new HttpException("Incorrect email or password.", HttpStatus.NOT_FOUND)
                }
            })
        )
    }

 

    findAll(): Observable<UserInterface[]>{
        return from(this.usersRepository.find())
    }

    findOne(id: number): Observable<UserInterface>{
        return from(this.usersRepository.findOne({id}))
    }

    private findUserByEmail(email: string): Observable<UserInterface>{
        return from(this.usersRepository.findOne({email}, {select: ['id', 'email', 'name', 'password']}))
    }

    private validatePassword(password: string, storedPasswordHash: string): Observable<boolean>{
        return this.authService.comparePasswords(password,storedPasswordHash)
    }
    
    private mailExists(email: string): Observable<boolean>{
        return from(this.usersRepository.findOne({email})).pipe(map((user: UserInterface) => {
            return !!user;
        }))
    }
}