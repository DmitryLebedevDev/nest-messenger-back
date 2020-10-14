import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthWebsocketStrategy } from 'src/auth/auth-websocket.guard';
import { SocketWithUser } from './socket.interface';
import { JwtService } from '@nestjs/jwt';
import { IjwtUser } from 'src/user/interface/user.interface';


@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  @SubscribeMessage('auth')
  auth(client: Socket, data: string) {

  }

  @SubscribeMessage('message')
  message(client: SocketWithUser, data) {
    console.log('message', client.user, data);
  }

  afterInit() {
    console.log('server sockets start');
  }

  async handleConnection(client: SocketWithUser) {
    try {
      client.user = await this.jwtService.decode(client.handshake.query.token) as IjwtUser;
    } catch (e) {
      client.disconnect(true)
    }
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id)
  }
}