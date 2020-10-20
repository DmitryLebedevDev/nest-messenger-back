import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  BaseWsExceptionFilter,
  MessageBody,
  ConnectedSocket,
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
import { checkAndCreateWsError } from 'src/common/createError';
import { UseFilters, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { BadRequestTransformationFilter } from '../filters/badRequestTransformationFilter'
import { BaseExceptionFilter } from '@nestjs/core';

@UseFilters(new BadRequestTransformationFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService,
              private socketService: SocketService,
              private roleService: RoleService
             ) {}

  ///@UsePipes(new ValidationWsData(CreateMessageDto))
  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() socket: SocketWithUser,
    @MessageBody() data: CreateMessageDto,
  ) {
    console.log(await this.roleService.userCanSendMessage(data.idRoom, socket.user.id));
    console.log('message', socket.user, data);
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