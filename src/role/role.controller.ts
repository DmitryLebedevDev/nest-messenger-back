import { Controller, Post, Body, Req, UseGuards, Delete } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';
import { RoomService } from 'src/room/room.service';
import { IreqUser } from 'src/user/interface/user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { DeleteRoleDto } from './dto/deleteRole.dto';
import { Role } from './role.entity';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private roleService: RoleService,
              private roomService: RoomService
             ) {}

  @Post('create')
  async createRole(@Body() createRoleDto: CreateRoleDto, @Req() req: IreqUser):Promise<Role> {
    const room = await this.roomService.findById(createRoleDto.idRoom);
    const role = await this.roleService.createRole(room, req.user.id, createRoleDto);
    delete role.room;
    return role;
  }
  @Post('update')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto, @Req() req: IreqUser):Promise<Role> {
    const room = await this.roomService.findById(updateRoleDto.idRoom);
    const role = await this.roleService.updateRole(room, req.user.id, updateRoleDto);
    delete role.room;
    return role;
  }
  @Delete('delete')
  async deleteRole(@Body() deleteRole: DeleteRoleDto, @Req() req: IreqUser):Promise<boolean> {
    const room = await this.roomService.findById(deleteRole.idRoom);
    const role = await this.roleService.deleteRole(room, req.user.id, deleteRole);
    return role;
  }
}
