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
  WsException,
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
import { UseFilters, Param, UsePipes, ValidationPipe, Body, HttpException } from '@nestjs/common';
import { BadRequestTransformationFilter } from '../filters/badRequestTransformationFilter'
import { BaseExceptionFilter } from '@nestjs/core';
import { RoomService } from 'src/room/room.service';

@UseFilters(new BadRequestTransformationFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(private jwtService: JwtService,
              private roleService: RoleService,
              private roomService: RoomService,
              private socketService: SocketService
             ) {}

  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() socket: SocketWithUser,
    @MessageBody() messageInfo: CreateMessageDto,
  ) {
    if(await this.roleService.isUserCanSendMessage(messageInfo.idRoom, socket.user.id)) {
      await this.roomService
                .createMessageInRoom(messageInfo.idRoom, socket.user.id, messageInfo.text);
      socket.to(String(messageInfo.idRoom))
            .emit('message', {idRoom: messageInfo.idRoom,
                              idUser: socket.user.id,
                              text: messageInfo.text
            })
    } else {
      throw new WsException('insufficient privileges');
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

  handleDisconnect(@ConnectedSocket() socket: SocketWithUser) {
    if(socket.user)
    this.socketService.removeUser(socket);
  }
}