import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  Column
} from 'typeorm'

import { User } from '@modules/users'

@Entity({
  name: 'usersTokens'
})
export class UsersTokens {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  expiresIn: number

  @Column()
  accessToken: string

  @Column()
  userId: number

  @ManyToOne(() => User, (user) => user.tokens, {
    nullable: true,
    eager: true
  })
  user: User

  @CreateDateColumn()
  createdAt: Date
}

export class UsersTokensFillable {
  expiresIn: number
  accessToken: string
  userId: number
  user?: User
}
