import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  idRoom: number

  @IsNotEmpty()
  @IsString()
  text: string
}