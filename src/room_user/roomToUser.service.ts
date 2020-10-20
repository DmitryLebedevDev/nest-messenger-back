import { Injectable } from '@nestjs/common';
import { RoomToUser } from './roomToUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from 'src/room/room.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';

@Injectable()
export class RoomToUserSevice {
  constructor(
              @InjectRepository(RoomToUser) private roomToUserRepository: Repository<RoomToUser>
             ) {}
  async checkUniqueRoomToUser(idRoom: number, idUser: number) {
    const isExist = await this._getUserToRoom(idRoom, idUser)
                              .getCount();
    return Boolean(isExist);
  }
  joinUser(room: Room, user: User, role: Role) {
    const roomToUser = this.roomToUserRepository
                           .create({room,user,role})
    return this.roomToUserRepository.save(roomToUser);
  }
  async getUserToRoom(idRoom: number, idUser: number) {
    return await this._getUserToRoom(idRoom, idUser).getOne();
  }
  private _getUserToRoom(idRoom: number, idUser: number) {
    return this.roomToUserRepository
               .createQueryBuilder('room_to_user')
               .innerJoin('room_to_user.room', 'room', 'room.id = :idRoom', {idRoom})
               .innerJoin('room_to_user.user','user', 'user.id = :idUser', {idUser})
  }
}
