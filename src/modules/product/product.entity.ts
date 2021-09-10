import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'

import { UsersProducts } from '@modules/usersProducts/usersProducts.entity'
import { User } from '@modules/user'

@Entity({
  name: 'products'
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: true })
  isActive: boolean

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  description: string

  @Column({ length: 255, nullable: true })
  category: string

  @Column()
  price: number

  @Column()
  timeUnit: number

  @Column()
  timeQuantity: string

  @ManyToOne(() => User, (user) => user.ownedProducts, { nullable: false })
  owner: User

  @OneToMany(() => UsersProducts, (userProducts) => userProducts.product)
  loans: UsersProducts[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export class ProductFillableFields {
  name: string
  description: string
  active: boolean
  category: string
  quantity: number
  price: number
}
