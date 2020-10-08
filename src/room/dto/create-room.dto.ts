;import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  name: string

  createrId?: number
  avatarId?: string
}