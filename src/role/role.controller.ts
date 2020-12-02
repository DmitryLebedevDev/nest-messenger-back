import { Controller, Post, Body, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';
import { RoomService } from 'src/room/room.service';
import { ERROR_MESSAGES } from 'src/common/ERROR_MESSAGES';
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
    try {
      const room = await this.roomService.findById(createRoleDto.idRoom);
      const role = await this.roleService.createRole(room, req.user.id, createRoleDto);
      delete role.room;
      return role;
    } catch (e) {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  e.message,
        error: ERROR_MESSAGES.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST)
    }
  }
  @Post('update')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto, @Req() req: IreqUser):Promise<Role> {
    try {
      const room = await this.roomService.findById(updateRoleDto.idRoom);
      const role = await this.roleService.updateRole(room, req.user.id, updateRoleDto);
      delete role.room;
      return role;
    } catch (e) {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  e.message,
        error: ERROR_MESSAGES.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST)
    }
  }
  @Post('delete')
  async deleteRole(@Body() deleteRole: DeleteRoleDto, @Req() req: IreqUser):Promise<boolean> {
    try {
      const room = await this.roomService.findById(deleteRole.idRoom);
      const role = await this.roleService.deleteRole(room, req.user.id, deleteRole);
      return role;
    } catch (e) {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  e.message,
        error: ERROR_MESSAGES.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
