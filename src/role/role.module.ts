import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoomToUserModule } from 'src/room_user/roomToUser.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), RoomToUserModule],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
