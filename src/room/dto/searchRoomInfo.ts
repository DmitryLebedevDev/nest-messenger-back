import { IsNotEmpty } from "class-validator";

export class SearchRoomInfoDto {
  @IsNotEmpty()
  q: string
}