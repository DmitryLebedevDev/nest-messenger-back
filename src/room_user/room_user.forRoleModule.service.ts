import { Injectable } from '@nestjs/common';
import { RoomToUserSeviceBase } from './room_user.base.service';
import { RoomToUser } from './entity/roomToUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomToUserForRoleM extends RoomToUserSeviceBase {}
