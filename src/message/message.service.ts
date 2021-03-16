import { Injectable } from "@nestjs/common";
import { Message } from "./message.entity";
import { MessageQueryService } from "./services/message.query.service";


@Injectable()
export class MessageService {
  constructor(private messageQueryService: MessageQueryService) {}

  getLastRoomMessages(idRoom: number, limit: number): Promise<Message[]> {
    return this.messageQueryService
               .getLastMessages(idRoom, limit);
  }
}