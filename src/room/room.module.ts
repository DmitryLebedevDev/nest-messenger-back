import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity'
import { RoomToUser } from 'src/room_user/roomToUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomToUser])],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
