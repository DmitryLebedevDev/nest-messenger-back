import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { Room } from "src/room/room.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({default: false})
  isDeleteUsersMesseges: boolean

  @Column({default: true})
  isDeleteYourMesseges: boolean

  @Column({default: false})
  isBannedUsers: boolean

  @Column({default: false})
  isMuteUsers: boolean

  @ManyToOne(type => Room, room => room.roomRoles)
  room: Room
}