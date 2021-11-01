import { Task } from './../resources/tasks/task.model';
import { Columns } from './../resources/columns/column.model';
import { Board } from './../resources/boards/board.model';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '../resources/users/user.model';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from '../common/config';

const DBConnection = async () =>
  await createConnection({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [User, Board, Columns, Task],
    synchronize: true,
    logging: true,
  });

export default DBConnection;
