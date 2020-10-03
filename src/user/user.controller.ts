import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userServise: UserService){}

  @Post('create')
  regUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return createUserDto;
  };
}
