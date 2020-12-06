/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IsanitiseUser } from 'src/user/interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from './auth.interface';

@Injectable()
export class AuthService {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({email, password});
      return this.userService.sanitiseData(user);
    } catch {
      return null;
    }
  }
  async login(user: IsanitiseUser):Promise<IAccessToken> {
    const payload = {id: user.id, email: user.email};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
