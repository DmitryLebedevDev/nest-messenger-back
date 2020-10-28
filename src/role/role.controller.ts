import { Controller, Post, Body, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';
import { RoomService } from 'src/room/room.service';
import { ERROR_MESSAGES } from 'src/common/ERROR_MESSAGES';
import { IreqUser } from 'src/user/interface/user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private roleService: RoleService,
              private roomService: RoomService
             ) {}


  @Post('create')
  async createRole(@Body() createRoleDto: CreateRoleDto, @Req() req: IreqUser) {
    try {
      const room = await this.roomService.findById(createRoleDto.idRoom);
      return await this.roleService.createRole(room, req.user.id, createRoleDto);
    } catch (e) {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  e.message,
        error: ERROR_MESSAGES.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
