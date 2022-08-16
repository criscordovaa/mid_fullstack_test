import {IUser} from "./user.model";

export interface IToken{
  token: string;
  user: IUser
}
