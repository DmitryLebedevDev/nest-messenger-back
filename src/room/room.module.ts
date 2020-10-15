import { Module, forwardRef } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity'
import { RoomToUser } from 'src/room_user/roomToUser.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomToUser]), forwardRef(() => SocketModule)],
  controllers: [RoomController],
  providers: [RoomService, JwtAuthGuard],
  exports: [RoomService]
})
export class RoomModule {}
