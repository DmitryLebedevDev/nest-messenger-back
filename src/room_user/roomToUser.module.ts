import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomToUser } from 'src/room_user/entity/roomToUser.entity';
import { RoomToUserForRoomM } from './room_user.forRoomModule.service';
import { RoomToUserForUserM } from './room_user.forUserModule.service';
import { RoomToUserForRoleM } from './room_user.forRoleModule.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomToUser])],
  providers: [RoomToUserForRoomM, RoomToUserForUserM, RoomToUserForRoleM],
  exports: [RoomToUserForRoomM, RoomToUserForUserM, RoomToUserForRoleM]
})
export class RoomToUserModule {}
