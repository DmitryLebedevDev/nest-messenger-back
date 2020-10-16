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
  create(room: Room, user: User, role: Role) {
    const roomToUser = this.roomToUserRepository
                           .create({room,user,role})
    return this.roomToUserRepository.save(roomToUser);
  }
}
