import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RenameRoomDto {
  @IsNotEmpty()
  @IsNumber()
  idRoom: number

  @IsNotEmpty()
  @IsString()
  newName: string
}