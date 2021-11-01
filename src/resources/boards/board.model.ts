import { Task } from './../tasks/task.model';
import { Columns } from './../columns/column.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: 'border Title' })
  title!: string;

  @OneToMany(() => Columns, (column) => column.board)
  columns!: Columns[];

  @OneToMany(() => Task, (task) => task.board)
  task!: Task[];
}
