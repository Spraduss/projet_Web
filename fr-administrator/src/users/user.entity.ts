import { last } from "rxjs";

export class User{

    id: number;
    lastName: string;
    firstName: string;
    age: number;

    constructor(id:number, lastname:string, firstname:string) {
        this.id = id;
        this.firstName = firstname;
        this.lastName = lastname;
    }


}