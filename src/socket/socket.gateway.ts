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

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  message() {}

  afterInit() {
    console.log('server sockets start');
  }

  handleConnection(client: Socket) {
    console.log('disconnect', client.id)
  }
  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id)
  }
}