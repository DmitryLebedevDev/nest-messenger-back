import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IsanitiseUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  sanitiseData<U extends User>(user: U): IsanitiseUser {
    delete user.password;
    return user;
  }
  async encryptPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.encryptPassword(createUserDto.password);
    const user = this.usersRepository
                     .create({...createUserDto, password: hash});
    return this.usersRepository.save(user);
  }
  async findById(id: number) {
    return this.usersRepository.findOne({id});
  }
  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository.findOne({email});
    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
  async getAll() {
    return this.usersRepository.find();
  }
}
