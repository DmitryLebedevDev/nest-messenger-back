import { Injectable } from '@nestjs/common';
import { RoomToUser } from './entity/roomToUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomToUserSeviceBase {
  constructor(@InjectRepository(RoomToUser) public roomToUserRepository: Repository<RoomToUser>) {}
  async checkUniqueRoomToUser(idRoom: number, idUser: number) {
    const isExist = await this._getUserToRoom(idRoom, idUser)
                              .getCount();
    return Boolean(isExist);
  }
  async getUserToRoom(idRoom: number, idUser: number, select?) {
    return await this._getUserToRoom(idRoom, idUser, select).getOne();
  }
  protected _getUserToRoom(idRoom: number, idUser: number, select = []) {
    select = ['room_to_user', ...select];
    return this.roomToUserRepository
               .createQueryBuilder('room_to_user')
               .select(select)
               .innerJoin('room_to_user.room', 'room', 'room.id = :idRoom', {idRoom})
               .innerJoin('room_to_user.user','user', 'user.id = :idUser', {idUser})
               .innerJoin('room_to_user.role', 'role')
  }
}
