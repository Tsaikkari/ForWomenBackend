import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import Stress from './Stress.postgres'

@Entity()
export default class Wisdom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  text!: string

  @Column({ nullable: true })
  image!: string

  @ManyToMany(() => Stress, (stress) => stress.wisdoms, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  stresses!: Stress[]
}
