import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ERROR_MESSAGES } from '../common/ERROR_MESSAGES';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userServise: UserService){}

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.userServise
               .getAll()
               .then(users =>
                  users.map(this.userServise.sanitiseData.bind(this.userServise))
                );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param () param) {
    return this.userServise.findById(param.id)
               .then(user => this.userServise.sanitiseData(user))
               .catch(_ => {
                  throw new HttpException({
                    status:   HttpStatus.NOT_FOUND,
                    message:  ERROR_MESSAGES.USER_WIDTH_ID_NOT_FOUND,
                    error:   'Not found'
                  }, HttpStatus.NOT_FOUND)
               });
  }
}
