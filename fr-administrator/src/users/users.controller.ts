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
        return this.service.getById(parameter.id);
    }

    @Put(':id')
    modifyUser(@Param() parameter, @Body() input): User {
        return this.service.modifyUser(parameter.id, input.firstname, input.lastname);
    }

    @Delete(':id')
    eraseUser(@Param() parameter): Boolean {
        return this.service.eraseUser(parameter.id);
    }

    @Post()
    create(@Body() input: any):User {
        return this.service.create(input.firstname, input.lastname, input.age);
    }

}

