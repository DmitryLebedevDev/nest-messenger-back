import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Room } from "src/room/room.entity";
import { Role } from "src/role/role.entity";

@Entity()
export class RoomToUser {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Role)
  @JoinColumn()
  role: Role

  @ManyToOne(type => User, user => user.roomToUsers)
  user: User

  @ManyToOne(type => Room, room => room.roomToUsers)
  room: Room
}