import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column
} from 'typeorm'

@Entity({
  name: 'error-logs'
})
export class ErrorLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  type: string

  @Column({ length: 255 })
  name: string

  @Column()
  status: number

  @Column({ length: 255 })
  message: string

  @Column({ type: 'json' })
  stack: Record<string, string>

  @Column({ type: 'json' })
  context: Record<string, string>

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export class ErrorLogFillableFields {
  type: string
  name?: string
  status?: number
  message: string
  stack?: Record<string, string> | any
  context?: Record<string, string> | any
}
