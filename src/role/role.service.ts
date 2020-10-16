import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from 'src/room/room.entity';
import { Role } from 'src/role/role.entity';
import { createDefaultOwnerRole, createDefaultUserRole } from './helpers/role.halpers';

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
}
