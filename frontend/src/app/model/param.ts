import {User} from "./user";
import {Branch} from "./branch";
import { Category } from "./category";

export class Param {
  constructor(
    public id?: number,
    public branch?: Branch,
    public megaCode?: string,
    public name?: string,
    public category?: Category,
    public generalManagerN1Mail?: string,
    public userGM?: User,
    public dispacherMail?:string
  ) {}
}
