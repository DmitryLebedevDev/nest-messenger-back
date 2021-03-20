import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";

import { Message } from "../message.entity";


@Injectable()
export class MessageQueryService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>
  ) {}

  getLastMessages(roomId: number, limit: number) {
    return (
      getManager()
        .createQueryBuilder()
        .select()
        .from<Message>(subQuery => {
          return (
            subQuery
              .select([
                'message."id"',
                'message."text"',
                'message."date"',
                'message."userId"'
              ])
              .from('message', 'message')
              .where('message.roomId = :id', {id: roomId})
              .orderBy('message.id', 'DESC')
              .limit(limit)
          )
        }, 'message')
        .orderBy('message.id', 'ASC')
        .getRawMany<Message>()
    )
  }
}