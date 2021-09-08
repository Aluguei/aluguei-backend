import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany
} from 'typeorm'

import { PasswordTransformer } from './password.transformer'

import { UserGenderEnum } from './userGender.enum'

const { availableSys } = UserGenderEnum

import { UserPasswordResetRequest } from '../userPasswordResetRequest'
import { UsersProducts } from '../usersProducts/usersProducts.entity'

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

  @OneToMany(() => UsersProducts, (userProducts) => userProducts.owner)
  ownedProducts: UsersProducts[]

  @OneToMany(() => UsersProducts, (userProducts) => userProducts.user)
  lentProducts: UsersProducts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

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
