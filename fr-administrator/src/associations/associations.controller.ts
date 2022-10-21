import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Controller('associations')
export class AssociationsController {

    constructor(
        private service: AssociationsService
    ){}

    @Get()
    retrieve(): Association[] {
        return this.service.retrieve();
    }

    @Get(':id')
    getById(@Param() parameter): Association {
        return this.service.getById(parameter.id);
    }

    @Get(':id/members')
    getMembers(@Param() parameter): User[] {
        return this.service.getMembers(parameter.id);
    }

    @Put(':id')
    modifyAssociation(@Param() parameter, @Body() input): Association {
        return this.service.modifyAssociation(parameter.id, input.idUsers, input.name);
    }

    @Delete(':id')
    eraseAssociation(@Param() parameter): Boolean {
        return this.service.eraseAssociation(parameter.id);
    }

    @Post()
    create(@Body() input: any):Association {
        return this.service.create(input.name, input.idUsers);
    }

}
