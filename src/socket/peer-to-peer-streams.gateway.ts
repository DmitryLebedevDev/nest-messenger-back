import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithUser } from './socket.interface';
import { JwtService } from '@nestjs/jwt';
import { IjwtUser } from 'src/user/interface/user.interface';
import { SocketService } from './socket.service';
import { RoleService } from 'src/role/role.service';
import { CreateMessageDto } from 'src/message/dto/createMessage.dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { BadRequestTransformationFilter } from '../filters/badRequestTransformationFilter'
import { RoomService } from 'src/room/room.service';

@UseFilters(new BadRequestTransformationFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class PeerToPeerStreamsGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private jwtService: JwtService,
              private roleService: RoleService,
              private roomService: RoomService,
              private socketService: SocketService
  ) {
    console.log("start")
  }
}