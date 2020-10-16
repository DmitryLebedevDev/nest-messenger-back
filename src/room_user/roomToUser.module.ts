import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomToUser } from 'src/room_user/roomToUser.entity';
import { RoomToUserSevice } from './roomToUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomToUser])],
  providers: [RoomToUserSevice],
  exports: [RoomToUserSevice]
})
export class RoomToUserModule {}
