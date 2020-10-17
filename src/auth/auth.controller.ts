import { Controller, Request, Post, UseGuards, Get, HttpException, HttpStatus, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ERROR_MESSAGES } from 'src/common/ERROR_MESSAGES';

@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthService,
              private userServise: UserService
             ) {}

  @Post('registration')
  async regUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userServise.create(createUserDto);
      const { access_token } = await this.authServise.login(user);
      return this.userServise.sanitiseData({...user, access_token});
    } catch {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  ERROR_MESSAGES.EMAIL_ALREADY_EXIST,
        error:   'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }
  };

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    console.log(req.user);
    return this.authServise.login(req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.userServise.findById(req.user.id);
    if (!user) {
      throw new HttpException("Unauthorized",HttpStatus.UNAUTHORIZED);
    }
    return this.userServise.sanitiseData(user);
  }
}