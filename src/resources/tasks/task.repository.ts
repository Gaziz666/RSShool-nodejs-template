import { User } from './../users/user.model';
import { Columns } from './../columns/column.model';
import { Board } from './../boards/board.model';
import { getRepository } from 'typeorm';
import { ITask, Task } from './task.model';

const taskSelectFields = [
  'task.id as id',
  'task.title as title',
  'task.order as order',
  'task.description as description',
  'board.id as "boardId"',
  'user.id as "userId"',
  'column.id as "columnId"',
];
export const tasksRepo = {
  getAll: async (boardId: string): Promise<Array<ITask>> => {
    const tasks = await getRepository(Task)
      .createQueryBuilder('task')
      .leftJoinAndSelect(Board, 'board', 'task.boardId = board.id')
      .leftJoinAndSelect(Columns, 'column', 'task.columnId = column.id')
      .leftJoinAndSelect(User, 'user', 'task.userId = user.id')
      .where('task.boardId = :boardId', {
        boardId,
      })
      .select(taskSelectFields)
      .execute();

    return tasks;
  },

  getOne: async (
    boardId: string,
    taskId: string
  ): Promise<Task | undefined> => {
    const task = await getRepository(Task)
      .createQueryBuilder('task')
      .leftJoinAndSelect(Board, 'board', 'task.boardId = board.id')
      .leftJoinAndSelect(Columns, 'column', 'task.columnId = column.id')
      .leftJoinAndSelect(User, 'user', 'task.userId = user.id')
      .where('task.boardId = :boardId and task.id = :taskId', {
        boardId,
        taskId,
      })
      .select(taskSelectFields)
      .execute();

    return task[0];
  },

  create: async ({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: Omit<ITask, 'id'>): Promise<Task> => {
    const params: Partial<Task> = { title, order, description };
    if (userId) params.user = userId;
    if (boardId) params.board = boardId;
    if (columnId) params.column = columnId;
    const newTask = await getRepository(Task)
      .createQueryBuilder()
      .insert()
      .into(Task)
      .values(params)
      .returning(
        '"id", "title", "order", "description", "boardId", "userId", "columnId" '
      )
      .execute()
      .then((result) => result.raw[0]);
    return newTask;
  },

  updateOne: async (
    boardId: string,
    taskId: string,
    params: Partial<Task>
  ): Promise<Task> => {
    const task = await getRepository(Task)
      .createQueryBuilder()
      .update()
      .set(params)
      .where('"boardId" = :boardId and "id" = :taskId', { boardId, taskId })
      .returning(
        '"id", "title", "order", "description", "boardId", "userId", "columnId" '
      )
      .execute()
      .then((result) => result.raw[0]);

    return task;
  },

  deleteOne: async (boardId: string, taskId: string) => {
    const result = await getRepository(Task)
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where({
        id: taskId,
        board: boardId,
      })
      .execute();
    return result;
  },
};
