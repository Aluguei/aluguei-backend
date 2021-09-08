import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  ManyToOne
} from 'typeorm'
import { User } from '..'

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
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export class UserPasswordResetRequestFillableFields {
  token?: string
  user: User
}
