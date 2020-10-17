import { Controller, Post, Body, UseGuards, Request, Get, Query, HttpStatus, HttpException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IreqUser } from 'src/user/interface/user.interface'
import { RoomService } from './room.service';
import { CheckUniqueNameDto } from './dto/check-unique-name.dto';
import { SocketService } from 'src/socket/socket.service';
import { UserService } from 'src/user/user.service';
import { RoomToUserSevice } from 'src/room_user/roomToUser.service';
import { RoleService } from 'src/role/role.service';
import { RoleIndex } from '../role/enums/role.enum';
import { JoinRoomDto } from './dto/join-room.dto';
import { ERROR_MESSAGES } from 'src/common/ERROR_MESSAGES';


@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService,
              private userService: UserService,
              private socketService: SocketService,
              private roleService: RoleService
             ) {}

  @Get('checkName')
  async checkUniqueName(@Query() checkUniqueNameDto: CheckUniqueNameDto) {
    return await this.roomService.checkUniqueName(checkUniqueNameDto.name);
  }
  @Post('join')
  async join(@Body() joinRoomDto: JoinRoomDto, @Query() req: IreqUser) {
    try {
      const room = await this.roomService.findById(joinRoomDto.id);
      const user = await this.userService.findById(req.user.id);
      const role = await this.roleService.getUserRole(joinRoomDto.id);
                   await this.roomService.joinUser(room,user,role);
    }
    catch {
        throw new HttpException({
          status:   HttpStatus.NOT_FOUND,
          message:  ERROR_MESSAGES.ROOM_NOT_FOUND,
          error:   'Not found'
        }, HttpStatus.BAD_REQUEST)
    }
  }
  @Post('create')
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req: IreqUser) {
    try {
      const user               = await this.userService.findById(req.user.id);
      const room               = await this.roomService.create(createRoomDto, req.user);
      const defaultRoleForRoom = await this.roleService.createDefaulRoles(room);
                                 await this.roomService.joinUser(
                                     room,
                                     user,
                                     defaultRoleForRoom[RoleIndex.owner]
                                 );
      room.roomRoles = this.roleService.deleteRoomField(defaultRoleForRoom); // fix circular dependency
      return room;
    }
    catch {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  ERROR_MESSAGES.ROOM_NAME_IS_NOT_UNIQUE,
        error:   'name is not unique'
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
