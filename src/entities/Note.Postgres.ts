import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
  } from 'typeorm'
  
  import User from './User.postgres'
  
  @Entity()
  export default class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    title!: string
  
    @Column()
    text!: string
  
    @ManyToOne(() => User, (user) => user.notes, {
      cascade: ['insert'],
      eager: true,
    })
    user!: User
  }
  