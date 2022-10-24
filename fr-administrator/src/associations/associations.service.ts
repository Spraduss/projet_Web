import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './associations.entity';


const associations: Association[] = [ {
    id: 0,
    idUsers: [0, 1],
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
            if (+id===+associations[i].id) {
                return associations[i];
            }
        }
        throw new HttpException(`Could not find a user with the id ${id}`, HttpStatus.NOT_FOUND);
    }

    modifyAssociation(id: number, idUsers: number[], name: string): Association {
        if (id!==undefined && idUsers!==undefined && name!==undefined) {
            for (let i=0 ; i<associations.length ; i++){
                if (+id===+associations[i].id) {
                    associations[i].name = name;
                    associations[i].idUsers = idUsers;
                    return associations[i];
                }
            }
        }
        throw new HttpException(`Could not find a user with the id ${id}`, HttpStatus.NOT_FOUND);
    }

    eraseAssociation(id:number): boolean {
        let indice = 0;
        for (indice; indice<associations.length ; indice++){
            if (+associations[indice].id===+id) {
                break;
            }
        } if (indice===associations.length) {
            throw new HttpException(`Could not find a user with the id ${id}`, HttpStatus.NOT_FOUND);
        } else {
            associations.splice(indice, 1);
            return true;
        }
    }

    create(name: string, idUsers: number[]) {
        if (name!==undefined && idUsers!==undefined) {
            associations.push(new Association(associations.length, idUsers, name));
            return associations[associations.length-1];
        }
    }

    getMembers(id: number): User[] {
        let asso: Association = this.getById(id);
        let users: User[] = [];
        for (let i=0 ; i<asso.idUsers.length ; i++) {
            let idUser: number = asso.idUsers[i];
            users.push(this.service.getById(idUser));
        }
        return users;
    }
}
