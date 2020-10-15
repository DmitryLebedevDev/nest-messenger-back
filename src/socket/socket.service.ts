import { Injectable } from '@nestjs/common';
import { SocketWithUser } from './socket.interface';
import { RoomService } from 'src/room/room.service';

interface Istrore {
  [idRoom: number]: SocketWithUser[]
}

@Injectable()
export class SocketService {
  store: Istrore = {}
  constructor(private roomService: RoomService) {
  }

  addUser(socket: SocketWithUser){

  }
}
