import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IreqUser } from 'src/user/interface/user.interface'
import { RoomService } from './room.service';


@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomServise: RoomService) {}


  @Post('create')
  createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req: IreqUser) {
    this.roomServise.create({...createRoomDto}, req.user);
  }
}
