export class User{

    id: number;
    lastname: string;
    firstname: string;
    age: number;

    constructor(id:number, lastname:string, firstname:string, age:number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }


}