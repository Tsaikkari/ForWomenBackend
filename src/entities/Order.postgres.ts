import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    ManyToOne,
  } from 'typeorm'
  
  import Service from './Service.postgres'
  import User from './User.postgres'

  @Entity()
  export default class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    address!: string

    @Column()
    postalCode!: string

    @Column()
    city!: string

    @Column({ nullable: true })
    shippingMethod!: string

    @Column()
    shippingPrice!: number
  
    @Column({ nullable: true })
    paymentResult!: string

    @Column({ nullable: true })
    taxPrice!: number

    @Column()
    totalPrice!: number

    @Column({
      default: false,
    })
    isPaid!: boolean

    @Column({ nullable: true })
    paidAt!: number
  
    @ManyToOne(() => User, (user) => user.orders, {
        cascade: ['insert'],
        eager: true
      })
      user!: User

    @ManyToMany(() => Service, (service) => service.orders)
    services!: Service[]
  }