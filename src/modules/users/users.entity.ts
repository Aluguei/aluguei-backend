import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany
} from 'typeorm'

import { PasswordTransformer } from './password.transformer'

import { UserGenderEnum } from './usersGender.enum'

const { availableSys } = UserGenderEnum

import { UserPasswordResetRequest } from '@modules/userPasswordResetRequest'
import { UsersProducts } from '@modules/usersProducts'
import { Product } from '@modules/products'

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

  @Column({ length: 255 })
  RG: string

  @Column({ length: 255 })
  CPF: string

  @Column({
    type: 'enum',
    enum: availableSys
  })
  gender: string

  @Column({ length: 255 })
  phoneOne: string

  @Column({ length: 255, nullable: true })
  phoneTwo: string

  @Column({ length: 255 })
  CEP: string

  @Column({ length: 255 })
  state: string

  @Column({ length: 255 })
  city: string

  @Column({ length: 255 })
  address: string

  @Column({ length: 255 })
  neighborhood: string

  @Column({ length: 255 })
  number: string

  @Column({ length: 255, nullable: true })
  complement: string

  @OneToMany(
    () => UserPasswordResetRequest,
    (userPasswordReset) => userPasswordReset.user
  )
  passwordResetRequests: UserPasswordResetRequest[]

  @OneToMany(() => Product, (product) => product.owner)
  ownedProducts: Product[]

  @OneToMany(() => UsersProducts, (userProducts) => userProducts.user)
  lentProducts: UsersProducts[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJSON() {
    delete this.password
    const fullName = `${this.firstName} ${this.lastName}`
    const { password, ...self } = this

    return { ...self, fullName }
  }
}

export class UserFillableFields {
  firstName: string
  lastName: string
  email: string
  password: string
  RG: string
  CPF: string
  gender: string
  phoneOne: string
  phoneTwo: string
  CEP: string
  state: string
  city: string
  address: string
  neighborhood: string
  number: string
  complement: string
}
