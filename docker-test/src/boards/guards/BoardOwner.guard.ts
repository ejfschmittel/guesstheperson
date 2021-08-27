import { CanActivate, ConsoleLogger, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, Param } from "@nestjs/common";
import { BoardsService } from "../boards.service";



abstract class OwnerGuard implements CanActivate{
    constructor() {}


    findObject(id){return null}

    getGeneralError = () => "Access denied Object does not exists.";
    getNotOwnerError = () => "Access denied: You do not have permission to access this object.";

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const user = request.user;
        const objectID = request.params.id;

        const object = await this.findObject(objectID)
        let errorMessage = this.getGeneralError()

        if(object){   
            if(object.owner.id == user.id)
                return true;
            errorMessage = this.getNotOwnerError()
        }

        throw new HttpException(errorMessage,HttpStatus.UNAUTHORIZED)
    }
}

@Injectable()
export class BoardOwnerGuard extends OwnerGuard{
    constructor(private readonly peopleService: BoardsService){
        super();
    }

    async findObject(id: string) {
        return await this.peopleService.findWithOwner(id)
    }
}
