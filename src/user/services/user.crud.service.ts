import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserBaseService } from './user.base.service';


@Injectable()
export class UserCrudService extends UserBaseService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    super()
  }

  private async encryptPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.encryptPassword(createUserDto.password);
    const user = this.usersRepository.create({...createUserDto, password: hash});
    return this.usersRepository.save(user);
  }
}
