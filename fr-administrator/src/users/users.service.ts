import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';



const users : User[] = [
    {
        id: 0,
        lastName: 'Doe',
        firstName: 'Jonh',
        age: 23
    }
]

@Injectable()
export class UsersService {

    retrieve() {
        return User;
    }

    getById(parameter): User {
        for (let i=0 ; i<users.length ; i++){
            if (+users[i].id===+parameter.id) {
                return users[i];
            }
        }
        throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
    }

}
