import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IreqUser } from 'src/user/interface/user.interface'
import { RoomService } from './room.service';
import { CheckUniqueNameDto } from './dto/check-unique-name.dto';
import { SocketService } from 'src/socket/socket.service';
import { UserService } from 'src/user/user.service';
import { RoomToUserSevice } from 'src/room_user/roomToUser.service';
import { RoleService } from 'src/role/role.service';
import { RolesIndex } from '../role/enums/role.enum';


@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService,
              private userService: UserService,
              private roomToUserSevice: RoomToUserSevice,
              private socketService: SocketService,
              private roleService: RoleService
             ) {}

  @Get('checkName')
  async checkUniqueName(@Query() checkUniqueNameDto: CheckUniqueNameDto) {
    return await this.roomService.checkUniqueName(checkUniqueNameDto.name);
  }
  @Post('create')
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req: IreqUser) {
    const room               = await this.roomService.create(createRoomDto, req.user);
    const defaultRoleForRoom = await this.roleService.createDefaulRoles(room);
    const user               = await this.userService.findById(req.user.id);
                               await this.roomToUserSevice.create(
                                  room,
                                  user,
                                  defaultRoleForRoom[RolesIndex.owner]
                               );
    room.roomRoles = defaultRoleForRoom.map(role => {delete role.room; return role});
    return room;
  }
}
