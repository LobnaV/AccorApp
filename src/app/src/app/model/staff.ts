import {Param} from "./param";

export class Staff {
  constructor(
    public id?: number,
    public mail?: string,
    public firstName?: string,
    public lastName?:string,
    public companyParameter?: Param
  ) {}
}
