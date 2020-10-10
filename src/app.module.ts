import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './user/user.entity';
import { RoomModule } from './room/room.module';
import { Room } from './room/room.entity';
import { RoomToUser } from './room_user/roomToUser.entity';
import { Role } from './role/role.entity';
import { Message } from './message/message.entity';

const nodeEnvMode = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${nodeEnvMode}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, RoomToUser, Room, Role, Message],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoomModule,
  ],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
