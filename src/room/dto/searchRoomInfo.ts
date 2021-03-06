import { IsNotEmpty, IsString } from "class-validator";

export class SearchRoomInfoDto {
  @IsNotEmpty()
  q: string
}