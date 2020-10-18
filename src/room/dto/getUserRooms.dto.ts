import { IsNotEmpty, IsNumber } from "class-validator";

export class GetUserRoomsDto {
  @IsNotEmpty()
  id: number
}