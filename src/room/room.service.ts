import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { IjwtUser } from 'src/user/interface/user.interface';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { Message } from 'src/message/message.entity';
import { RoomToUserForRoomM } from 'src/room_user/room_user.forRoomModule.service';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room)    private roomRepository: Repository<Room>,
              @InjectRepository(Message) private messageRepository: Repository<Message>,
                                         private roomToUserSeviceRoomM: RoomToUserForRoomM,
             ) {}

  async create(createUserDto: CreateRoomDto, jwtUser: IjwtUser) {
    const room = this.roomRepository
                     .create({
                      ...createUserDto,
                      createrId: jwtUser.id
                    });
    return this.roomRepository.save(room);
  }
  async createMessageInRoom(idRoom: number, idUser: number, text: string) {
    const room = new Room();
          room.id = idRoom;
    const user = new User();
          user.id = idUser;

    const message = this.messageRepository.create({
      room,
      user,
      text
    });

    return this.messageRepository.save(message);
  }
  async joinUser(room: Room, user: User, role: Role) {
    return await this.roomToUserSeviceRoomM.joinUser(room,user,role);
  }
  async leaveUser(idRoom: number, idUser: number) {
    return await this.roomToUserSeviceRoomM.leaveUser(idRoom,idUser);
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
    return await this.roomToUserSeviceRoomM.checkUniqueRoomToUser(idRoom,idUser);
  }
}
