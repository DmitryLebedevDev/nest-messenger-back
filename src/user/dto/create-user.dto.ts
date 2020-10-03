export class CreateUserDto {
  readonly firstName: String
  readonly lastName: String
  readonly email: String
  readonly password: String
  readonly avatarId?: String
}