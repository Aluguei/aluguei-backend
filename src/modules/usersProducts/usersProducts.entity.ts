import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Product } from '../product/product.entity'
import { User } from '../user/user.entity'

@Entity({
  name: 'usersProducts'
})
export class UsersProducts {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.ownedProducts, { eager: true })
  owner: User

  @ManyToOne(() => Product, (product) => product.loans, { eager: true })
  product: Product

  @ManyToOne(() => User, (user) => user.lentProducts, {
    nullable: true,
    eager: true
  })
  user: User
}
