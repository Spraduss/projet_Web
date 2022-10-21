import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './associations.entity';


const associations: Association[] = [ {
    id: 0,
    users: [new User(0,'Lachance','Lucien',10), new User(1,'Mitterand','Frédéric',51)],
    name: 'defaultAssociation'
}]


@Injectable()
export class AssociationsService {

    constructor(
        private service: UsersService
    ) {}

    retrieve(): Association[] {
        return associations;
    }

    getById(id: number): Association {
        for (let i=0 ; i<associations.length ; i++){
            if (id===associations[i].id) {
                return associations[i];
            }
        }
        throw new HttpException(`Could not find an association with the id ${id}`, HttpStatus.NOT_FOUND);
    }

    modifyAssociation(id: number, users: User[], name: string): Association {
        if (id!==undefined && users!==undefined && name!==undefined) {
            for (let i=0 ; i<associations.length ; i++){
                if (id===associations[i].id) {
                    associations[i].name = name;
                    associations[i].users = users;
                    return associations[i];
                }
            }
        }
        throw new HttpException(`Could not find an association with the id ${id}`, HttpStatus.NOT_FOUND);
    }

    eraseAssociation(id:number): boolean {
        let indice = 0;
        for (indice; indice<associations.length ; indice++){
            if (+associations[indice].id===+id) {
                break;
            }
        } if (indice===associations.length) {
            throw new HttpException(`Could not find an association with the id ${id}`, HttpStatus.NOT_FOUND);
        } else {
            associations.splice(indice, 1);
            return true;
        }
    }

    create(name: string, users: User[]) {
        if (name!==undefined && users!==undefined) {
            associations.push(new Association(associations.length, users, name));
            return associations[associations.length-1];
        }
    }

    getMembers(id: number): User[] {
        if (id!==undefined) {
            let users: User[] = [];
            for (let i=0 ; i<associations.length ; i++){
                if (+associations[i].id===+id) {
                    return associations[i].users;
                }
            }
        }
        throw new HttpException(`Could not find an association with the id ${id}`, HttpStatus.NOT_FOUND);
    }
}
