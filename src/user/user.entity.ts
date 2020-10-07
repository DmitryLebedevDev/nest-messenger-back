import { Entity, Column, PrimaryGeneratedColumn, Table, ManyToMany, ManyToOne } from "typeorm";
import { RoomToUser } from "src/room_user/roomToUser.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

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

  @ManyToOne(type => RoomToUser, roomToUser => roomToUser.user)
  roomToUsers: RoomToUser[]
}