import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { IsanitiseUser } from '../interface/user.interface';


@Injectable()
export class UserBaseService {
  sanitiseData<U extends User>(user: U): IsanitiseUser {
    delete user.password;
    return user;
  }
}
