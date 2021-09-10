import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Product } from '@modules/product/product.entity'
import { User } from '@modules/user/user.entity'

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
