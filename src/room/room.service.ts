import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { IjwtUser } from 'src/user/interface/user.interface';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createDefaultRoles } from './helpers/room.halpers';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  create(createUserDto: CreateRoomDto, jwtUser: IjwtUser) {
    const room = this.roomRepository
                     .create({
                      ...createUserDto,
                      createrId: jwtUser.id,
                      roomRoles: createDefaultRoles()
                    });
    return this.roomRepository.save(room);
  }
  async checkUniqueName(name: string) {
    const roomLen = await this.roomRepository.count({name});
    if (roomLen) {
      return false;
    }
    return true;
  }
}
