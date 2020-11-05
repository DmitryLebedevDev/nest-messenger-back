import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoggerModule } from 'src/logger/logger.module';
import { UserQueryService } from './services/user.query.service';
import { UserCrudService } from './services/user.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  providers: [UserService, UserQueryService, UserCrudService, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
