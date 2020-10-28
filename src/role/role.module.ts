import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoomToUserModule } from 'src/room_user/roomToUser.module';
import { RoomModule } from 'src/room/room.module';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), RoomToUserModule, forwardRef(() => RoomModule)],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
