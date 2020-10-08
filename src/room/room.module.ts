import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity'
import { RoomToUser } from 'src/room_user/roomToUser.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomToUser])],
  controllers: [RoomController],
  providers: [RoomService, JwtAuthGuard]
})
export class RoomModule {}
