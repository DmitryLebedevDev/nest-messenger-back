import { Controller, Post, Body, UseGuards, Request, Get, Query, HttpStatus, HttpException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IreqUser } from 'src/user/interface/user.interface'
import { RoomService } from './room.service';
import { CheckUniqueNameDto } from './dto/check-unique-name.dto';
import { SocketService } from 'src/socket/socket.service';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { RoleIndex } from '../role/enums/role.enum';
import { JoinRoomDto } from './dto/join-room.dto';
import { ERROR_MESSAGES } from 'src/common/ERROR_MESSAGES';
import { checkExistRoom } from './createrException/createrException';
import { GetUserRoomsDto } from './dto/getUserRooms.dto';


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
    return await !this.roomService.checkUniqueName(checkUniqueNameDto.name);
  }
  @Get('getUserRoom')
  async getUserRoom(@Body() getUserRoomsDto: GetUserRoomsDto) {
    return await this.roomService.getUserRooms(getUserRoomsDto.id);
  }
  @Post('join')
  async join(@Body() joinRoomDto: JoinRoomDto, @Request() req: IreqUser) {
    if(await this.roomService.checkUserExistInRoom(joinRoomDto.id, req.user.id)) {
      throw new HttpException({
        status:   HttpStatus.BAD_REQUEST,
        message:  ERROR_MESSAGES.USER_ALRADY_IN_ROOM,
        error:   'User alrady in room'
      }, HttpStatus.BAD_REQUEST)
    }
    const user = await this.userService.findById(req.user.id);

    const room = await this.roomService.findById(joinRoomDto.id);
    checkExistRoom(room);

    const role = await this.roleService.getUserRole(joinRoomDto.id);

    await this.roomService.joinUser(room,user,role);

    this.socketService.addRoomForUser(room.id, user.id);
    return {};
  }
  @Post('create')
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req: IreqUser) {
    const user               = await this.userService.findById(req.user.id);

    const room               = await this.roomService.create(createRoomDto, req.user);
    checkExistRoom(room);

    const defaultRoleForRoom = await this.roleService.createDefaulRoles(room);
                               await this.roomService.joinUser(
                                  room,
                                  user,
                                  defaultRoleForRoom[RoleIndex.owner]
                               );
    room.roomRoles = this.roleService.deleteRoomField(defaultRoleForRoom); // fix circular dependency
    return room;
  }
}
