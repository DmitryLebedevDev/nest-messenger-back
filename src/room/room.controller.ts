import { Controller, Post, Body, UseGuards, Request, Get, Query, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
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
import { LeaveRoomDto } from './dto/leave-room.dto';
import { RenameRoomDto } from './dto/rename-room.dto';
import { check } from '../common/check';
import { Room } from './room.entity';
import { IRoomWRole } from './room.interface';
import { SearchRoomInfoDto } from './dto/searchRoomInfo';


@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService,
              private userService: UserService,
              private socketService: SocketService,
              private roleService: RoleService
             ) {}
  @Get('search')
  async search(@Query() searchInfo: SearchRoomInfoDto) {
    return await this.roomService.getSimilarRooms(searchInfo.q);
  }
  @Get('checkName')
  async checkUniqueName(@Query() checkUniqueNameDto: CheckUniqueNameDto):Promise<boolean> {
    return await this.roomService.checkUniqueName(checkUniqueNameDto.name);
  }
  @Get('getUserRooms/:id')
  async getUserRoom(@Param('id', ParseIntPipe) idUser):Promise<Room[]> {
    return await this.roomService.getUserRooms(idUser);
  }
  @Get('getUserRoomWRole/:id')
  async getUserRoomWRole(@Param('id', ParseIntPipe) idUser):Promise<IRoomWRole[]> {
    return await this.roomService.getUserRoomsWRole(idUser);
  }
  @Get('getUserRoomWRoleMessage/:id')
  async getUserRoomWRoleMessage(
    @Param('id', ParseIntPipe) idUser,
  ):Promise<IRoomWRole[]> {
    return await this.roomService.getUserRoomsWRoleMessage(idUser, 5);
  }
  @Post('join')
  async join(@Body() joinRoomDto: JoinRoomDto, @Request() req: IreqUser) {
    check(await this.roomService.checkUserExistInRoom(joinRoomDto.id, req.user.id),
          ERROR_MESSAGES.USER_ALRADY_IN_ROOM,
          ERROR_MESSAGES.USER_ALRADY_IN_ROOM
    )
    const user = await this.userService.getUser({id:req.user.id});

    const room = await this.roomService.findById(joinRoomDto.id);
    check(!room, 'room not found');

    const role = await this.roleService.getUserRole(joinRoomDto.id);

    await this.roomService.joinUser(room,user,role);

    this.socketService.addRoomForUser(room.id, user.id);
    return {message: 'ok'};
  }
  @Post('leave')
  async leave(@Body() leaveRoomDto: LeaveRoomDto, @Request() req: IreqUser) {
    await this.socketService.deleteRoomForUser(leaveRoomDto.id, req.user.id);
    await this.roomService.leaveUser(leaveRoomDto.id,req.user.id);
    return {message: 'ok'};
  }
  @Post('create')
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req: IreqUser) {
    const user               = await this.userService.getUser({id: req.user.id});

    const isUniqueRoomName       = await this.roomService.checkUniqueName(createRoomDto.name);
    check(!isUniqueRoomName, ERROR_MESSAGES.ROOM_NAME_IS_NOT_UNIQUE);

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
  @Post('rename')
  async renameRoom(@Body() {idRoom, newName}: RenameRoomDto, @Request() req: IreqUser) {
    return this.roomService.renameRoom(idRoom, req.user.id, newName);
  }
  @Get('/:idRoom')
  async getRoom(@Param('idRoom', ParseIntPipe) idRoom: number):Promise<Room> {
    const room = this.roomService.findById(idRoom);
    check(!room, ERROR_MESSAGES.ROOM_NOT_FOUND,
                 ERROR_MESSAGES.ROOM_NOT_FOUND,
                 HttpStatus.BAD_REQUEST
    );
    return room;
  }
}
