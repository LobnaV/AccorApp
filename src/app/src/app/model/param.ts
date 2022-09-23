import {User} from "./user";
import {Branch} from "./branch";

export class Param {
  constructor(
    public id?: number,
    public branch?: Branch,
    public megaCode?: string,
    public name?: string,
    public userGM?: User,
    public dispacherMail?:string
  ) {}
}
