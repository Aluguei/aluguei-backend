import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Product } from '@modules/products'
import { User } from '@modules/users'

@Entity({
  name: 'usersProducts'
})
export class UsersProducts {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.loans, { eager: true })
  product: Product

  @ManyToOne(() => User, (user) => user.lentProducts, {
    nullable: true,
    eager: true
  })
  user: User
}

export class UsersProductsFillable {
  product: Product
  user: User
}
