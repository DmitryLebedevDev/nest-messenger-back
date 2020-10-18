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
import { IsNotEmpty, IsNumber, IsString, validate } from 'class-validator';
import { RoleService } from 'src/role/role.service';
import { CreateMessageDto } from 'src/message/dto/createMessage.dto';
import { createDto } from 'src/common/createDto';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService,
              private socketService: SocketService,
              private roleService: RoleService
             ) {}

  @SubscribeMessage('message')
  async message(socket: SocketWithUser, data) {
    const createMessageDto = createDto(data, CreateMessageDto);
    const errors = await validate(createMessageDto);

    console.log(createMessageDto);
    if (errors.length > 0) {
      console.log('message', socket.user, createMessageDto, errors);
    } else {
      console.log('message', socket.user, createMessageDto);
    }
  }

  afterInit() {
  }

  async handleConnection(socket: SocketWithUser) {
    try {
      socket.user = await this.jwtService.decode(socket.handshake.query.token) as IjwtUser;
      if(!socket.user) {
        throw 'no user';
      }
      this.socketService.addUser(socket);
    } catch (e) {
      socket.disconnect(true);
    }
  }

  handleDisconnect(socket: SocketWithUser) {
    console.log('disconnect', socket.id)
    this.socketService.removeUser(socket);
  }
}