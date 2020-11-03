import { Injectable } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { Room } from '../room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message/message.entity';
import { RoomToUserForRoomM } from 'src/room_user/room_user.forRoomModule.service';

@Injectable()
export class RoomQueryService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async findById(id: number) {
    return this.roomRepository.findOne({id});
  }
  async getCount(params: FindConditions<Room>) {
    return (await this.roomRepository.find(params)).length;
  }
  async getUserRooms(idUser:number, isOnliId?: boolean) {
    return this.roomRepository
               .createQueryBuilder('room')
               .select(isOnliId ? 'room.id' : 'room')
               .innerJoin('room.roomToUsers', 'roomToUsers')
               .innerJoin('roomToUsers.user', 'user', 'user.id = :id', {id: idUser})
               .getMany();
  }
}
