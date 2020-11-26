import { Injectable } from '@nestjs/common';
import { RoomToUserSeviceBase } from './room_user.base.service';
import { Room } from 'src/room/room.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';

@Injectable()
export class RoomToUserForRoomM extends RoomToUserSeviceBase {
  async joinUser(room: Room, user: User, role: Role) {
    const roomToUser = this.roomToUserRepository
                           .create({room,user,role})
    return this.roomToUserRepository.save(roomToUser);
  }
  async leaveUser(idRoom: number, idUser: number) {
    const room_to_user = await this._getUserToRoom(idRoom,idUser).getOne();
    return room_to_user && this.roomToUserRepository.delete({id: room_to_user.id});
  }
}
