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
  name: 'notifications'
})
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: true })
  isNew: boolean

  @Column({ type: 'json' })
  data: Record<string, any>

  @ManyToOne(() => User, (user) => user.notifications, {
    nullable: false,
    eager: true
  })
  owner: User

  @Column()
  ownerId: number

  @Column({ default: null })
  visualizedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export class NotificationsFillableFields {
  data: Record<string, any>
  ownerId: number
}
