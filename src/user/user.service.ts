import { Injectable } from '@nestjs/common';
import { UserCrudService } from './services/user.crud.service';
import { UserQueryService } from './services/user.query.service'
import { UserBaseService } from './services/user.base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { FindConditions } from 'typeorm';

@Injectable()
export class UserService extends UserBaseService {
  constructor(private userCrudService: UserCrudService,
              private userQueryService: UserQueryService,
             ) {super()}
  getUser(user: FindConditions<User>) {
    return this.userQueryService.findOne(user);
  }
  getAllUser() {
    return this.userQueryService.getAll();
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userCrudService.create(createUserDto)
    return user;
  }
}
