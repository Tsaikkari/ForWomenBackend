import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'

import User from './User.postgres'

@Entity()
export default class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  name!: string

  @OneToMany(() => User, (user) => user.group, {
    eager: true,
    cascade: ['insert'],
  })
  members!: User[]
}
