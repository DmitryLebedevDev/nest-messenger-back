import { Module, forwardRef } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SocketModule } from 'src/socket/socket.module';
import { UserModule } from 'src/user/user.module';
import { RoomToUserModule } from 'src/room_user/roomToUser.module';
import { RoleModule } from 'src/role/role.module';
import { Message } from 'src/message/message.entity';
import { RoomQueryService } from './services/room.query.service';
import { RoomCrudService } from './services/room.crud.service';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message]),
            forwardRef(() => SocketModule),
            forwardRef(() => RoleModule),
            UserModule,
            RoomToUserModule,
            RoleModule,
            MessageModule
           ],
  controllers: [RoomController],
  providers: [RoomService,RoomQueryService,RoomCrudService,JwtAuthGuard],
  exports: [RoomService]
})
export class RoomModule {}
