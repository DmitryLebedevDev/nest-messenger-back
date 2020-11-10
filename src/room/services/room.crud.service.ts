import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { Room } from '../room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomCrudService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.save({...createRoomDto});
  }
  async updateRoom(room: Room, newRoomData: DeepPartial<Room>) {
    return this.roomRepository.save({...room, ...newRoomData});
  }
}
