import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number

  @Column({nullable: false})
  firstName: String

  @Column({nullable: false})
  surname: String

  @Column({nullable: false})
  email: String

  @Column({nullable: false})
  password: String
}