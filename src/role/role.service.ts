/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from 'src/room/room.entity';
import { Role } from 'src/role/role.entity';
import { createDefaultOwnerRole, createDefaultUserRole } from './helpers/role.halpers';
import { RoleName } from './enums/role.enum';
import { RoomToUserForRoleM } from 'src/room_user/room_user.forRoleModule.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ERROR_MESSAGES } from 'src/common/ERROR_MESSAGES';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { DeleteRoleDto } from './dto/deleteRole.dto';
import { check } from 'src/common/check';

@Injectable()
export class RoleService {
  constructor(
              @InjectRepository(Role) private roleRepository: Repository<Role>,
              private roomToUserForRoleM: RoomToUserForRoleM
             ) {}
  createDefaulRoles(room: Room): Promise<Role[]> {
    const defaultOwnerRole = this.roleRepository.create(createDefaultOwnerRole());
    const defaultUserRole  = this.roleRepository.create(createDefaultUserRole());
    defaultOwnerRole.room = room;
    defaultUserRole.room = room;
    return this.roleRepository.save([defaultOwnerRole,defaultUserRole]);
  }
  createRole(room: Room | null, idUser: number, createRoleDto: CreateRoleDto) {
    check(!room, ERROR_MESSAGES.ROOM_NOT_FOUND);
    check(room.createrId !== idUser, ERROR_MESSAGES.INSUFFICIENT_PRIVILEGES);

    return this.roleRepository.save({room,...createRoleDto});
  }
  async updateRole(room: Room | null, idUser: number,updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({id: updateRoleDto.idRole});
    check(room, ERROR_MESSAGES.ROOM_NOT_FOUND);
    check(room.createrId !== idUser, ERROR_MESSAGES.INSUFFICIENT_PRIVILEGES);
    check(role,ERROR_MESSAGES.ROLE_NOT_FOUND);

    const newRole = await this.roleRepository.save(Object.assign(role,updateRoleDto))
    delete newRole.idRole;

    return newRole;
  }
  async deleteRole(room: Room | null, idUser: number, deleteRole: DeleteRoleDto) {
    const role = await this.roleRepository.findOne({id: deleteRole.idRole});
    check(room, ERROR_MESSAGES.ROOM_NOT_FOUND);
    check(room.createrId !== idUser, ERROR_MESSAGES.INSUFFICIENT_PRIVILEGES);
    check(role,ERROR_MESSAGES.ROLE_NOT_FOUND);

    await this.roleRepository.delete({id: role.id});
    return true;
  }
  getUserRole(idRoom: number):Promise<Role> {
    return this.roleRepository.createQueryBuilder('role')
                              .select(['role'])
                              .innerJoin(
                                         'role.room', 'room',
                                         'room.id = :idRoom and role.name = :nameRole',
                                         {idRoom: idRoom, nameRole: RoleName.user}
                                        )
                              .getOne();
  }
  async isUserCanSendMessage(idRoom: number, idUser: number):Promise<boolean> {
    const roomToUser = await this.roomToUserForRoleM.getUserToRoom(idRoom,idUser, ['role']);
    return (roomToUser && roomToUser.role && roomToUser.role.isSendMessage ? true : false);
  }
  deleteRoomField(roles: Role[]):Role[] {
    return roles.map(role => {delete role.room; return role});
  }
}
