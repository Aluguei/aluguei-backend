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
  timeQuantity: string
  description: string
  category: string
  timeUnit: number
  price: number
  name: string
}
