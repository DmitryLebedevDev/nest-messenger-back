import { IsNotEmpty, IsNumber } from "class-validator";

export class JoinRoomDto {
  @IsNotEmpty()
  @IsNumber()
  id: number
}