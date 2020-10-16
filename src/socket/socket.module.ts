import { Module, forwardRef } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { JwtAuthWebsocketStrategy } from 'src/auth/auth-websocket.guard';
import { JwtModule } from '@nestjs/jwt';
import { SocketService } from './socket.service';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [
    forwardRef(() => RoomModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.jwtKey,
        signOptions: {expiresIn: '24h'}
      })
    })
  ],
  providers: [SocketGateway, JwtAuthWebsocketStrategy, SocketService],
  exports: [SocketService]
})
export class SocketModule {}
