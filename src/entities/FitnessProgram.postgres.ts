import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
  } from 'typeorm'

  import User from './User.postgres'

  @Entity()
  export default class FitnessProgram extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @ManyToMany(() => User, (user) => user.fitnessPrograms)
    users!: User[]
  }