import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { RoomToUser } from "src/room_user/roomToUser.entity";
import { Role } from "src/role/role.entity";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false, unique: true})
  name: string

  @Column({nullable: false})
  createrId: number

  @Column({default: null})
  avatarId?: string

  @OneToMany(type => Role, role => role.room)
  roomRoles: Role[]

  @ManyToOne(type => RoomToUser, roomToUser => roomToUser.room)
  roomToUsers: RoomToUser[]
}