import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
} from 'typeorm'

import Order from './Order.postgres'
import Group from './Group.postgres'
import FitnessProgram from './FitnessProgram.postgres'
import Appointment from './Appointment.postgres'
import Note from './Note.Postgres'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  username!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  firstName!: string

  @Column({ nullable: true })
  mobile!: string

  @Column({ nullable: true })
  image!: string

  @Column()
  role!: string

  @Column({ default: false, nullable: true })
  isAdmin!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @ManyToOne(() => Group, (group) => group.members, {
    cascade: ['insert', 'remove'],
  })
  group!: Group

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  orders!: Order[]

  @ManyToMany(() => FitnessProgram, (fitnessProgram) => fitnessProgram.users, {
    cascade: true, 
    eager: true,
  })
  @JoinTable()
  fitnessPrograms!: FitnessProgram[]

  @OneToMany(() => Appointment, (appointment) => appointment.user, {
    cascade: ['remove'], 
  })
  @JoinTable()
  appointments!: Appointment[]

  @OneToMany(() => Note, (note) => note.user, {
    cascade: ['remove'], 
  })
  @JoinTable()
  notes!: Note[]
}
