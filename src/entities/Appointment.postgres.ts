import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm'

import User from './User.postgres'

@Entity()
export default class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  startDate!: Date

  @Column()
  endDate!: Date

  @Column()
  text!: string

  @ManyToOne(() => User, (user) => user.appointments, {
    cascade: ['insert'],
    eager: true,
  })
  user!: User
}
