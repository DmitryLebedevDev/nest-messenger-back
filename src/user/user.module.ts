import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoomToUser } from 'src/room_user/roomToUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoomToUser])],
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
