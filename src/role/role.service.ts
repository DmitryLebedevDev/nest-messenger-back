import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from 'src/room/room.entity';
import { Role } from 'src/role/role.entity';
import { createDefaultOwnerRole, createDefaultUserRole } from './helpers/role.halpers';
import { RoleName } from './enums/role.enum';

@Injectable()
export class RoleService {
  constructor(
              @InjectRepository(Role) private roleRepository: Repository<Role>
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
  async userCanSendMessage(idRoom: number, idUser: number) {
    const role = await this.roleRepository.createQueryBuilder('role')
                                    .select(['role'])
                                    .innerJoin(
                                      'role.room', 'room',
                                      'room.id = :idRoom',
                                      {idRoom: idRoom}
                                    )
                                    .innerJoin(
                                      'role.user', 'user',
                                      'user.id = :idUser',
                                      {idUser: idUser}
                                    )
                                    .getOne();
    return (role && role.isSendMessage ? true : false);
  }
  deleteRoomField(roles: Role[]) {
    return roles.map(role => {delete role.room; return role});
  }
}
