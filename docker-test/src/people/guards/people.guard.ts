import { CanActivate, ConsoleLogger, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, Param } from "@nestjs/common";
import { PeopleService } from "../people.service";

@Injectable()
export class PersonOwnerGuard implements CanActivate{
    constructor(private readonly peopleService: PeopleService){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const user = request.user;
        const personID = request.params.id;

        console.log(personID)
        const person = await this.peopleService.findWithOwner(personID)
       

        let errorMessage = "You have to be logged In to access Person."

        if(person){   
            if(person.owner.id == user.id)
                return true;
            errorMessage = "You are not the owner of this person."
        }

        throw new HttpException(errorMessage,HttpStatus.UNAUTHORIZED)
    }
}