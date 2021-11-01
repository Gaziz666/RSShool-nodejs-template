import { Columns } from './../columns/column.model';
import { Board } from './../boards/board.model';
import { User } from './../users/user.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}
@Entity('Task')
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: 'title' })
  title!: string;

  @Column({ type: 'integer', default: 0 })
  order!: number;

  @Column({ type: 'varchar', default: '' })
  description!: string;

  @ManyToOne(() => User, (user) => user.task, { onDelete: 'SET NULL' })
  user!: User['id'];

  @ManyToOne(() => Board, (board) => board.task, { onDelete: 'SET NULL' })
  board!: Board['id'];

  @ManyToOne(() => Columns, (column) => column.task, { onDelete: 'SET NULL' })
  column!: Columns['id'];
}
