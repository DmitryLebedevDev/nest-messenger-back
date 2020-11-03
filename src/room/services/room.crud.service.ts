import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { Room } from '../room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomCrudService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async updateRoom(room: Room, newRoomData: DeepPartial<Room>) {
    this.roomRepository.save({...room, ...newRoomData});
  }
}
