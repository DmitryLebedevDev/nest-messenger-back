import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Message } from "./message.entity";
import { MessageService } from './message.service';
import { MessageQueryService } from './services/message.query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, MessageQueryService],
  exports: [MessageService]
})
export class MessageModule {}