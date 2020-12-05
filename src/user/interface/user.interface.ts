import { User } from "../user.entity";
import { Request } from 'express';

export type IsanitiseUser = Omit<User,'password'>
export interface IreqUser extends Request {
  user: IjwtUser
}
export interface IjwtUser {
  id: number
  email: string
}