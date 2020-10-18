import { Injectable } from '@nestjs/common';
import { SocketWithUser } from './socket.interface';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class SocketService {
  constructor(private roomService: RoomService) {
  }

  async addUser(socket: SocketWithUser) {
    const userId = socket.user.id;
    const userRoomsId = await this.roomService
                                  .getUserRooms(userId, true)
                                  .then(rooms => rooms.map(room => String(room.id)))
    socket.join(userRoomsId);
  }
  async removeUser(socket: SocketWithUser) {
    socket.leaveAll();
  }
}
