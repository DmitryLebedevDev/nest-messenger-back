import { Entity, Column, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number

  @Column({nullable: false})
  firstName: string

  @Column({nullable: false})
  lastName: string

  @Column({nullable: false, unique: true})
  email: string

  @Column({nullable: false})
  password: string

  @Column({default: null})
  avatarId: string
}