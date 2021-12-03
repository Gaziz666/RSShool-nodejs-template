import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.model';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: 'USER' })
  name!: string;

  @Column({ type: 'varchar', default: 'user' })
  login!: string;

  @Column({ type: 'varchar', default: 'P@55w)rd' })
  password?: string;

  @OneToMany(() => Task, (task) => task.user)
  task!: Task[];
}
