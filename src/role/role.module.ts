import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoomToUserModule } from 'src/room_user/roomToUser.module';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), RoomToUserModule, forwardRef(() => RoomModule)],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
