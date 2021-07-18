import {
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    BaseEntity,
    ManyToMany,
} from 'typeorm'

import Wisdom from './Wisdom.postgres'

@Entity() 
export default class Stress extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @ManyToMany(() => Wisdom, (wisdom) => wisdom.stresses)
      wisdoms!: Wisdom[]
}