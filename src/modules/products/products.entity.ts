import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Entity,
  Column
} from 'typeorm'

import { UsersProducts } from '@modules/usersProducts/usersProducts.entity'
import { User } from '@modules/users'

import { ProductTimeUnitEnum } from './productTimeUnits.enum'
@Entity({
  name: 'products'
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isLent: boolean

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  description: string

  @Column({ length: 255, nullable: true })
  category: string

  @Column()
  price: number

  @Column({ enum: ProductTimeUnitEnum.getSysValues() })
  timeUnit: string

  @Column({ type: 'float' })
  timeQuantity: number

  @ManyToOne(() => User, (user) => user.ownedProducts, {
    nullable: false,
    eager: true
  })
  owner: User

  @Column()
  ownerId: number

  @OneToMany(() => UsersProducts, (userProducts) => userProducts.product)
  loans: UsersProducts[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export class ProductFillableFields {
  timeQuantity: number
  description: string
  category: string
  timeUnit: string
  price: number
  name: string
}
