import { IsNotEmpty } from "class-validator";

export class CheckUniqueNameDto {
  @IsNotEmpty()
  name: string
}