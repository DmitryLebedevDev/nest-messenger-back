import { Room } from "../room.entity";
import { HttpStatus, HttpException } from "@nestjs/common";
import { ERROR_MESSAGES } from "src/common/ERROR_MESSAGES";

export function checkExistRoom(room: Room) {
  if (!room) {
    throw new HttpException({
      status:   HttpStatus.NOT_FOUND,
      message:  ERROR_MESSAGES.ROOM_NOT_FOUND,
      error:   'Not found'
    }, HttpStatus.BAD_REQUEST)
  }
}