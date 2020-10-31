import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteRoleDto {
  @IsNotEmpty()
  @IsNumber()
  idRoom: number

  @IsNotEmpty()
  @IsNumber()
  idRole: number
}