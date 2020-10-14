import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { JwtAuthWebsocketStrategy } from 'src/auth/auth-websocket.guard';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.jwtKey,
        signOptions: {expiresIn: '24h'}
      })
    })
  ],
  providers: [SocketGateway, JwtAuthWebsocketStrategy]
})
export class SocketModule {}
