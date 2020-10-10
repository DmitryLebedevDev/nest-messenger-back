import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IreqUser } from 'src/user/interface/user.interface'
import { RoomService } from './room.service';
import { CheckUniqueNameDto } from './dto/check-unique-name.dto';


@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomServise: RoomService) {}

  @Get('checkName')
  async checkUniqueName(@Query() checkUniqueNameDto: CheckUniqueNameDto) {
    return await this.roomServise.checkUniqueName(checkUniqueNameDto.name);
  }
  @Post('create')
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req: IreqUser) {
    return await this.roomServise.create({...createRoomDto}, req.user);
  }
}
