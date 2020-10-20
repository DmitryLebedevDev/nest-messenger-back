import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { IjwtUser } from 'src/user/interface/user.interface';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { RoomToUserSevice } from 'src/room_user/roomToUser.service';
import { Role } from 'src/role/role.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>,
                                      private roomToUserSevice: RoomToUserSevice,
             ) {}

  async create(createUserDto: CreateRoomDto, jwtUser: IjwtUser) {
    const room = this.roomRepository
                     .create({
                      ...createUserDto,
                      createrId: jwtUser.id
                    });
    return this.roomRepository.save(room);
  }
  async joinUser(room: Room, user: User, role: Role) {
    return await this.roomToUserSevice.joinUser(room,user,role);
  }
  async getUserRooms(idUser:number, isOnliId?: boolean) {
    return await this.roomRepository
                     .createQueryBuilder('room')
                     .select(isOnliId ? 'room.id' : 'room')
                     .innerJoin('room.roomToUsers', 'roomToUsers')
                     .innerJoin('roomToUsers.user', 'user', 'user.id = :id', {id: idUser})
                     .getMany();
  }
  async findById(id) {
    return await this.roomRepository.findOne({id});
  }
  async checkUniqueName(name: string) {
    const isExist = await this.roomRepository.count({name});
    return Boolean(isExist);
  }
  async checkUserExistInRoom(idRoom: number, idUser: number) {
    return await this.roomToUserSevice.checkUniqueRoomToUser(idRoom,idUser);
  }
}
