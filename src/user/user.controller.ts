import { Controller, Get, Post, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ERROR_MESSAGES } from '../common/ERROR_MESSAGES';

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
        status:   HttpStatus.BAD_REQUEST,
        message:  ERROR_MESSAGES.EMAIL_ALREADY_EXIST,
        error:   'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }
  };
  @Get(':id')
  async getUser(@Param () param) {
    return this.userServise.find(param.id)
               .then(user => this.userServise.sanitiseData(user))
               .catch(_ => {
                  throw new HttpException({
                    status:   HttpStatus.NOT_FOUND,
                    message:  ERROR_MESSAGES.USER_WIDTH_ID_NOT_FOUND,
                    error:   'Not found'
                  }, HttpStatus.NOT_FOUND)
               });
  }
  @Get('getAll')
  async getAllUsers() {
    return this.userServise
               .getAll()
               .then(users =>
                  users.map(this.userServise.sanitiseData.bind(this.userServise))
                );
  }
}
