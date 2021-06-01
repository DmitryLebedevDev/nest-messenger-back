import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  BadRequestTransformationFilter
} from '../filters/badRequestTransformationFilter'


@UseFilters(new BadRequestTransformationFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class PeerToPeerStreamsGateway {
  @WebSocketServer()
  private server: Server;

  constructor() {
    console.log("start")
  }
}