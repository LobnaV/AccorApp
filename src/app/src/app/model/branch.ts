import {User} from "./user";

export class Branch {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public userMGM?: User,
    public perimeter?:string
  ) {}
}
