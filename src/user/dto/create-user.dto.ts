import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string

  @IsNotEmpty()
  readonly lastName: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @Length(8,20)
  readonly password: string

  readonly avatarId?: string
}