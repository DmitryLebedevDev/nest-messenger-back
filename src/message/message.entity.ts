/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({default: 0})
  date: number

  @ManyToOne(type => User)
  @JoinColumn()
  user: User
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => Room, room => room.messages)
  room: Room
  @Column({ nullable: true })
  roomId: number;
}