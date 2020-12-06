import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ERROR_MESSAGES } from '../common/ERROR_MESSAGES';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsanitiseUser } from './interface/user.interface';
import { check } from 'src/common/check';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  async getAllUsers():Promise<IsanitiseUser[]> {
    return this.userService
               .getAllUser()
               .then(users =>
                  users.map(this.userService.sanitiseData.bind(this.userService))
               );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param ('id', ParseIntPipe) userId: number):Promise<IsanitiseUser> {
    return this.userService.getUser({id: userId})
               .then(user => {
                 check(!user, ERROR_MESSAGES.USER_WIDTH_ID_NOT_FOUND,
                              ERROR_MESSAGES.USER_WIDTH_ID_NOT_FOUND,
                              HttpStatus.NOT_FOUND)
                 return this.userService.sanitiseData(user)
               })
  }
}
