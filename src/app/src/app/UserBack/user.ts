import {Role} from "./role";

export class User {
    id?:number;
    email?:string;
    UserId?:number;
    username?:string;
    password?:string;
    CompanyName?:string;
    firstName?:string;
    lastName?:string;
    CompanyAccountId?:string;
    roles?:Array<Role>;
    MemberShips?:Array<any[]>;
    costcenter?:Array<any[]>
}
