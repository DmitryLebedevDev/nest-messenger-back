import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from 'src/room/room.entity';
import { Role } from 'src/role/role.entity';
import { createDefaultOwnerRole, createDefaultUserRole } from './helpers/role.halpers';
import { RoleName } from './enums/role.enum';
import { RoomToUserSevice } from 'src/room_user/roomToUser.service';

@Injectable()
export class RoleService {
  constructor(
              @InjectRepository(Role) private roleRepository: Repository<Role>,
              private roomToUserService: RoomToUserSevice
             ) {}
  createDefaulRoles(room: Room): Promise<Role[]> {
    const defaultOwnerRole = this.roleRepository.create(createDefaultOwnerRole());
    const defaultUserRole  = this.roleRepository.create(createDefaultUserRole());
    defaultOwnerRole.room = room;
    defaultUserRole.room = room;
    return this.roleRepository.save([defaultOwnerRole,defaultUserRole]);
  }
  getUserRole(idRoom) {
    return this.roleRepository.createQueryBuilder('role')
                              .select(['role'])
                              .innerJoin(
                                         'role.room', 'room',
                                         'room.id = :idRoom and role.name = :nameRole',
                                         {idRoom: idRoom, nameRole: RoleName.user}
                                        )
                              .getOne();
  }
  async isUserCanSendMessage(idRoom: number, idUser: number) {
    const roomToUser = await this.roomToUserService.getUserToRoom(idRoom,idUser, ['role']);
    return (roomToUser && roomToUser.role && roomToUser.role.isSendMessage ? true : false);
  }
  deleteRoomField(roles: Role[]) {
    return roles.map(role => {delete role.room; return role});
  }
}
