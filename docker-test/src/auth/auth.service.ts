import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt"; 
import * as bcrypt from "bcrypt"
import { Observable, from } from 'rxjs';
import { UserInterface } from 'src/users/models/users.interface';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: UserInterface): Observable<string>{
        return from(this.jwtService.signAsync({user}))
    }

    hashPassword(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12))
    }

    comparePasswords(password: string, storedPasswordHash: string): Observable<any> {
        return from(bcrypt.compare(password, storedPasswordHash))
    }
}
