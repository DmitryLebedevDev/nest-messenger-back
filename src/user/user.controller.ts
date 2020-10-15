import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ERROR_MESSAGES } from '../common/ERROR_MESSAGES';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SocketService } from 'src/socket/socket.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.userService
               .getAll()
               .then(users =>
                  users.map(this.userService.sanitiseData.bind(this.userService))
                );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param () param) {
    return this.userService.findById(param.id)
               .then(user => this.userService.sanitiseData(user))
               .catch(_ => {
                  throw new HttpException({
                    status:   HttpStatus.NOT_FOUND,
                    message:  ERROR_MESSAGES.USER_WIDTH_ID_NOT_FOUND,
                    error:   'Not found'
                  }, HttpStatus.NOT_FOUND)
               });
  }
}
