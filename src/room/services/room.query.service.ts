import { Injectable } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { Room } from '../room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRoomWRole } from '../room.interface';

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
  async getUserRoomsWRole(idUser: number): Promise<IRoomWRole[]> {
    return this.roomRepository
               .createQueryBuilder('room')
               .select(['room', 'roomToUsers', 'role'])
               .innerJoin('room.roomToUsers', 'roomToUsers')
               .innerJoin('roomToUsers.user', 'user', 'user.id = :id', {id: idUser})
               .innerJoin('roomToUsers.role', 'role')
               .getMany()
               .then(rooms => rooms.map(room => {
                  (room as IRoomWRole).role = room.roomToUsers[0]?.role
                  delete room.roomToUsers;

                  return room as IRoomWRole;
               }));
  }

  async getSimilarRooms(name: string): Promise<Room[]> {
    return this.roomRepository
               .createQueryBuilder('room')
               .select('room')
               .where('room.name like :roomName', {roomName: `%${name}%`})
               .limit(10)
               .getMany();
  }
}
