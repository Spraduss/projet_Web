import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';



const users : User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'Jonh',
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

    modifyUser(id: number, firstname: string, lastname: string): User {
        let indice = 0;
        for (indice; indice<users.length ; indice++){
            if (+users[indice].id===+id) {
                break;
            }
        }
        if (firstname !== undefined) {
            users[indice].firstname = firstname;
        } if (lastname !== undefined) {
            users[indice].lastname = lastname;
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

    create(firstname: string, lastname: string, age: number):User {
        if (firstname!==undefined && lastname!==undefined && age!==undefined) {
            users.push(new User(users.length, lastname, firstname, age));
            return users[users.length-1];
        }
    }

}
