import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository, FindConditions } from 'typeorm';
import { compare } from 'bcrypt';
import { UserBaseService } from './user.base.service';

@Injectable()
export class UserQueryService extends UserBaseService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    super()
  }

  async findOne(user: FindConditions<User>):Promise<User> {
    if(user.password && user.email) {
      const findUser = await this.usersRepository
                                 .findOne({email: user.email});
      if (user && compare(user.password, findUser.password)) {
        return findUser;
      }
      return null;
    }
    return this.usersRepository.findOne(user);
  }
  async getAll():Promise<User[]> {
    return this.usersRepository.find();
  }
}