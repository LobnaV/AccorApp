import {Role} from "./role";

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public roles?: Role[],
    public resetPasswordToken?: string
  ) {
  }
}
