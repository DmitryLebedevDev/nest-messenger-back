import { User } from "../user.entity";

export interface IsanitiseUser extends Omit<User,'password'> {}