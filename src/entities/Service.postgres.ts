import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import Order from './Order.postgres'

@Entity()
export default class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  price!: number

  @ManyToMany(() => Order, (order) => order.services)
  orders!: Order[]
}