import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsOptional } from "class-validator";

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  idRoom: number

  @IsNotEmpty()
  @IsNumber()
  idRole: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsBoolean()
  isDeleteUsersMesseges: boolean

  @IsOptional()
  @IsBoolean()
  isDeleteYourMesseges: boolean

  @IsOptional()
  @IsBoolean()
  isBannedUsers: boolean

  @IsOptional()
  @IsBoolean()
  isMuteUsers: boolean

  @IsOptional()
  @IsBoolean()
  isSendMessage: boolean
}