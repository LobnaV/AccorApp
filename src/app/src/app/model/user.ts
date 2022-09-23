import {Role} from "./role";

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public roles?: Role[],
    public resetPasswordToken?: string
  ) {
  }
}
