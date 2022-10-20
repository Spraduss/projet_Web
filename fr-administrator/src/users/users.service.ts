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

    retrieve(): User[] {
        return users;
    }

    getById(id: number): User {
        for (let i=0 ; i<users.length ; i++){
            if (+users[i].id===+id) {
                return users[i];
            }
        }
        throw new HttpException(`Could not find a user with the id ${id}`, HttpStatus.NOT_FOUND);
    }

    modifyUser(id: number, firstName: string, lastName: string): User {
        let indice = 0;
        for (indice; indice<users.length ; indice++){
            if (+users[indice].id===+id) {
                break;
            }
        }
        if (firstName !== undefined) {
            users[indice].firstName = firstName;
        } if (lastName !== undefined) {
            users[indice].lastName = lastName;
        }
        return users[indice];
    }

    eraseUser(id: number): Boolean {
        let indice = 0;
        for (indice; indice<users.length ; indice++){
            if (+users[indice].id===+id) {
                break;
            }
        } if (indice===users.length) {
            throw new HttpException(`Could not find a user with the id ${id}`, HttpStatus.NOT_FOUND);
        } else {
            users.splice(indice, 1);
            return true;
        }
    }

    create(firstName: string, lastName: string, age: number):User {
        if (firstName!==undefined && lastName!==undefined && age!==undefined) {
            users.push(new User(users.length, lastName, firstName, age));
            return users[users.length-1];
        }
    }

}
