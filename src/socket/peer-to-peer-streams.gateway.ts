import {
  ConnectedSocket, MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  BadRequestTransformationFilter
} from '../filters/badRequestTransformationFilter'
import { SocketWithUser } from './socket.interface'
import { ConnectToStreamDto } from './dto/ConnectToStream.dto';


@UseFilters(new BadRequestTransformationFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class PeerToPeerStreamsGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('/connectToAudioStream')
  connectToAudioStream(
    @ConnectedSocket() socket: SocketWithUser,
    @MessageBody() socketId: string
  ):void {
    this.server.sockets.sockets[socketId].emit(
      'connectToAudioStream', socket.id
    )
  }
  @SubscribeMessage('/connectDesc')
  connectDesc(
    @MessageBody() connect: ConnectToStreamDto
  ) {
    this.server.sockets.sockets[connect.to].emit(
      'connectDesc', connect
    )
  }
  @SubscribeMessage('/connectAsc')
  connectAsc(
    @MessageBody() connect: ConnectToStreamDto
  ) {
    this.server.sockets.sockets[connect.to].emit(
      '/connectAsc', connect
    )
  }
}