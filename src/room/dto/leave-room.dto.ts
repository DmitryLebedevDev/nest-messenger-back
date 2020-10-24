import { IsNotEmpty, IsNumber } from "class-validator";

export class LeaveRoomDto {
  @IsNotEmpty()
  @IsNumber()
  id: number
}