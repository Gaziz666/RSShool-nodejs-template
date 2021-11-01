import { Task } from './../tasks/task.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Board } from '../boards/board.model';

@Entity('Columns')
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: 'title' })
  title!: string;

  @Column({ type: 'integer', default: 0 })
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board!: Board;

  @OneToMany(() => Task, (task) => task.column)
  task!: Task[];
}
