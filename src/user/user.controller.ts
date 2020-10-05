import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userServise: UserService){}

  @Post('create')
  async regUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userServise.create(createUserDto);
      return this.userServise.sanitiseData(user);
    } catch {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'email already exists',
        error: 'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }
  };
}
