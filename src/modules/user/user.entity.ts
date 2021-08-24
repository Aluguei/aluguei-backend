import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column
} from 'typeorm'
import { PasswordTransformer } from './password.transformer'

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  firstName: string

  @Column({ length: 255 })
  lastName: string

  @Column({ length: 255 })
  email: string

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer()
  })
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  toJSON() {
    delete this.password
    const { password, ...self } = this
    return self
  }
}

export class UserFillableFields {
  email: string
  firstName: string
  lastName: string
  password: string
}
