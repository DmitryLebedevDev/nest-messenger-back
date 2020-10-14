import { IoAdapter } from '@nestjs/platform-socket.io';
import { extract, parse } from 'query-string';
import { JwtService } from '@nestjs/jwt';
import { INestApplicationContext } from '@nestjs/common';

export class AuthenticatedWsIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
  }

  createIOServer(port: number, options?: any): any {
    options.allowRequest = async (request, allowFunction)  => {
      const token = parse(extract(request.url)).token;
      try {
        await this.jwtService.verify(token as string)
      } catch(e) {
        allowFunction('Unauthorized', false);
      }
      return allowFunction(null, true)
    }
    return super.createIOServer(port, options);
  }
}