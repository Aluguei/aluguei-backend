import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  Column
} from 'typeorm'

import { User } from '@modules/users'

@Entity({
  name: 'usersPasswordResets'
})
export class UserPasswordResetRequest {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'uuid' })
  token: string

  @ManyToOne(() => User, (user) => user.passwordResetRequests, { eager: true })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export class UserPasswordResetRequestFillableFields {
  token?: string
  user: User
}
