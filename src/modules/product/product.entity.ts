import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'products'
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  active: boolean

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  description: string

  @Column({ length: 255 })
  category: string

  @Column({ nullable: true })
  stars: 'float'

  @Column()
  quantity: number

  @Column({ nullable: true })
  timesLent: number

  @Column()
  price: number
}

export class ProductFillableFields {
  name: string
  description: string
  active: boolean
  category: string
  quantity: number
  price: number
}
