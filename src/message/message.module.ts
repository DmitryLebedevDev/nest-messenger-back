import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Message } from "./message.entity";
import { MessageQueryService } from './services/message.query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageQueryService],
  exports: [MessageQueryService]
})
export class MessageModule {}