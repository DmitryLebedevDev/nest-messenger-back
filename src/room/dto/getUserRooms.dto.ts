import { IsNotEmpty } from "class-validator";

export class GetUserRoomsDto {
  @IsNotEmpty()
  id: number
}