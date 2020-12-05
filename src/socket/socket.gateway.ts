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
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
  ):Promise<void> {
    if(await this.roleService.isUserCanSendMessage(messageInfo.idRoom, socket.user.id)) {
      await this.roomService
                .createMessageInRoom(messageInfo.idRoom, socket.user.id, messageInfo.text);
      this.server.to(String(messageInfo.idRoom))
                 .emit('message', {idRoom: messageInfo.idRoom,
                                   idUser: socket.user.id,
                                   text: messageInfo.text
                 })
    } else {
      throw new WsException('insufficient privileges');
    }
  }

  async handleConnection(socket: SocketWithUser):Promise<void> {
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

  handleDisconnect(@ConnectedSocket() socket: SocketWithUser):void {
    if(socket.user)
      this.socketService.removeUser(socket);
  }
}