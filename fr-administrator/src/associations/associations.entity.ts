import { User } from "src/users/user.entity";
import { Entity } from "typeorm";

@Entity()
export class Association {

    public id: number;
    public users: User[];
    public name: string;

    constructor (id: number, users: User[], name: string) {
        this.id = id;
        this.users = users;
        this.name = name;
    }
}