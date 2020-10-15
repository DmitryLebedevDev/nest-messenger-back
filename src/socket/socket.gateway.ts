import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketWithUser } from './socket.interface';
import { JwtService } from '@nestjs/jwt';
import { IjwtUser } from 'src/user/interface/user.interface';
import { UserService } from 'src/user/user.service';
import { SocketService } from './socket.service';


@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService,
              private socketService: SocketService
             ) {}

  @SubscribeMessage('message')
  message(client: SocketWithUser, data) {
    console.log('message', client.user, data);
  }

  afterInit() {
  }

  async handleConnection(client: SocketWithUser) {
    try {
      client.user = await this.jwtService.decode(client.handshake.query.token) as IjwtUser;
      if(!client.user) {
        throw 'no user';
      }
    } catch (e) {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id)
  }
}