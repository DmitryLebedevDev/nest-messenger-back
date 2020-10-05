import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: Number

  @Column({nullable: false})
  firstName: String

  @Column({nullable: false})
  lastName: String

  @Column({nullable: false, unique: true})
  email: String

  @Column({nullable: false})
  password: String

  @Column({default: null})
  avatarId: String
}