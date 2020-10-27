import { IsNotEmpty, IsNumber, IsString, IsBoolean } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  idRoom: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsBoolean()
  isDeleteUsersMesseges: boolean

  @IsNotEmpty()
  @IsBoolean()
  isDeleteYourMesseges: boolean

  @IsNotEmpty()
  @IsBoolean()
  isBannedUsers: boolean

  @IsNotEmpty()
  @IsBoolean()
  isMuteUsers: boolean

  @IsNotEmpty()
  @IsBoolean()
  isSendMessage: boolean
}