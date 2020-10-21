import { Entity, Column, PrimaryGeneratedColumn, Table, ManyToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @ManyToOne(type => User)
  @JoinColumn()
  user: User

  @ManyToOne(type => Room, room => room.messages)
  room: Room
}