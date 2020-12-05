import { Injectable } from '@nestjs/common';
import { SocketWithUser } from './socket.interface';
import { RoomService } from 'src/room/room.service';

interface IidUserToIdSocket {
  [idUser: string]: SocketWithUser // idRoom
}

@Injectable()
export class SocketService {
  private idUserToIdSocket: IidUserToIdSocket = {}

  constructor(private roomService: RoomService) {
  }

  async addRoomForUser(idRoom:number,idUser: number):Promise<void> {
    this.idUserToIdSocket[idUser]
    &&
    this.idUserToIdSocket[idUser].join(String(idRoom));
  }
  async deleteRoomForUser(idRoom: number, idUser: number):Promise<void> {
    this.idUserToIdSocket[idUser]
    &&
    this.idUserToIdSocket[idUser].leave(String(idRoom));
  }
  async addUser(socket: SocketWithUser):Promise<void> {
    const userId = socket.user.id;
    const userRoomsId = await this.roomService
                                  .getUserRooms(userId, true)
                                  .then(rooms => rooms.map(room => String(room.id)))
    socket.join(userRoomsId);
    this.idUserToIdSocket[socket.user.id] = socket;
  }
  async removeUser(socket: SocketWithUser):Promise<void> {
    socket.leaveAll();
    delete this.idUserToIdSocket[socket.user.id];
  }
}
