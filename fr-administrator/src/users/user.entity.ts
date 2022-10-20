export class User{

    id: number;
    lastName: string;
    firstName: string;
    age: number;

    constructor(id:number, lastname:string, firstname:string, age:number) {
        this.id = id;
        this.firstName = firstname;
        this.lastName = lastname;
        this.age = age;
    }


}