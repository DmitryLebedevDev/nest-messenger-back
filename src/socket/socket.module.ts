import { Module, forwardRef } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { JwtAuthWebsocketStrategy } from 'src/auth/auth-websocket.guard';
import { JwtModule } from '@nestjs/jwt';
import { SocketService } from './socket.service';
import { RoomModule } from 'src/room/room.module';
import { RoleModule } from 'src/role/role.module';
import { PeerToPeerStreamsGateway } from './peer-to-peer-streams.gateway';

@Module({
  imports: [
    RoleModule,
    forwardRef(() => RoomModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.jwtKey,
        signOptions: {expiresIn: '24h'}
      })
    })
  ],
  providers: [
    SocketGateway,
    PeerToPeerStreamsGateway,
    JwtAuthWebsocketStrategy,
    SocketService
  ],
  exports: [SocketService]
})
export class SocketModule {}
