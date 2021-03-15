import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Message } from "../message.entity";


@Injectable()
export class MessageQueryService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>
  ) {}

  getLastMessages(roomId: number, limit: number): Promise<Message[]> {
    return this.messageRepository
               .createQueryBuilder('message')
               .innerJoin('message.room', 'room', 'room.id = :id', {id: roomId})
               .limit(limit)
               .getMany()
  }
}