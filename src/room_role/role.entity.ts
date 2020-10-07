import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "src/user/user.entity";
import { Room } from "src/room/room.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  isDeleteUsersMesseges: boolean

  @Column()
  isDeleteYourMesseges: boolean

  @Column()
  isBannedUsers: boolean

  @Column()
  isMuteUsers: boolean

  @ManyToOne(type => Room, room => room.roomRoles)
  room: Room
}