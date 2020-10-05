import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  sanitiseData(user: User): Omit<User, 'password'> {
    delete user.password;
    return user;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const user = this.usersRepository
                     .create({...createUserDto, password: hash});
    return user;
  }
  async find(id: Number) {
    return this.usersRepository.findOne({id});
  }
}
