import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';    
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ){}

    @Get('all')
    getAll(): string[] {
        return['a', 'b', 'c'];
    }

    @Get()
    retrieve(): User[] {
        return this.service.retrieve();
    }

    @Get(':id')
    getById(@Param() parameter): User {
        return this.service.getById(parameter);
    }

    @Put(':id')
    modifyUser(@Param() parameter, @Body() input): User {
        let indice = 0;
        for (indice; indice<users.length ; indice++){
            if (+users[indice].id===+parameter.id) {
                break;
            }
        }
        if (input.firstName !== undefined) {
            users[indice].firstName = input.firstName;
        } if (input.lastName !== undefined) {
            users[indice].lastName = input.lastName;
        }
        return users[indice];
    }

    @Delete(':id')
    eraseUser(@Param() parameter): Boolean {
        let indice = 0;
        for (indice; indice<users.length ; indice++){
            if (+users[indice].id===+parameter.id) {
                break;
            }
        } if (indice===users.length) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        } else {
            users.splice(indice, 1);
            return true;
        }
    }

    @Post()
    create(@Body() input: any):User {
        this.service.create(input.firstname, input.lastname)
        return User;
    }

}

