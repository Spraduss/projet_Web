import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { last } from 'rxjs';



@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    
    async retrieve(): Promise<User[]> {
        return await this.repository.find({});
    }

    async getById(idToFind: number): Promise<User> {
        let user = this.repository.findOne({where: {id: idToFind,},});
        if (user===undefined) throw new HttpException(`Could not find a user with the id ${idToFind}`, HttpStatus.NOT_FOUND);
        return user;
    }

    async modifyUser(id: number, firstName: string, lastName: string, age: number): Promise<User> {
        let user = await this.getById(id);
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        return await this.repository.save(user);
    }

    async eraseUser(id: number): Promise<Boolean> {
        let user = await this.getById(id);
        let deletion = await this.repository.delete(user);
        return deletion!==undefined;
    }

    async create(firstName: string, lastName: string, age: number):Promise<User> {
        let idToCreate: number = 0;
        const user = this.repository.create({id: idToCreate, lastName: lastName, firstName: firstName, age: age})
        return this.repository.save(user);
    }

}
