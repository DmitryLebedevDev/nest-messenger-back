import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: String

  @IsNotEmpty()
  readonly lastName: String

  @IsNotEmpty()
  @IsEmail()
  readonly email: String

  @IsNotEmpty()
  @Length(8,20)
  readonly password: String

  readonly avatarId?: String
}