import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { IjwtUser } from 'src/user/interface/user.interface';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  joinUser(idUser: number, idRoom: number) {
    this.roomRepository.createQueryBuilder('room');
  }
  async create(createUserDto: CreateRoomDto, jwtUser: IjwtUser) {
    const room = this.roomRepository
                     .create({
                      ...createUserDto,
                      createrId: jwtUser.id
                    });
    return this.roomRepository.save(room);
  }
  async getUserRooms(idUser:number) {
    return await this.roomRepository
                     .createQueryBuilder('room')
                     .select('room')
                     .innerJoin('room.roomToUsers', 'roomToUsers')
                     .innerJoin('roomToUsers.user', 'user', 'user.id = :id', {id: idUser});
  }
  async checkUniqueName(name: string) {
    const roomLen = await this.roomRepository.count({name});
    if (roomLen) {
      return false;
    }
    return true;
  }
}
