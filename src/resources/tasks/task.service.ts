import { tasksRepo } from './task.repository';
import { ITask, Task } from './task.model';

export const tasksService = {
  getAll: async (boardId: string) => {
    const result = await tasksRepo.getAll(boardId);
    return result;
  },

  getOne: async (boardId: string, taskId: string) => {
    const task = await tasksRepo.getOne(boardId, taskId);
    if (!task) throw new Error('notFound');
    return task;
  },

  create: async (
    boardId: string,
    { title, order, description, userId, columnId }: ITask
  ) => {
    if (!title || !(+order >= 0) || !description) {
      throw new Error('badRequest');
    }
    const task = await tasksRepo.create({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    if (!task) throw new Error('task not created');
    return task;
  },

  updateOne: async (boardId: string, taskId: string, body: Task) => {
    const params: Partial<Task> = {};
    if (body.title) {
      params.title = body.title;
    }
    if (body.order) {
      params.order = body.order;
    }
    if (body.description) {
      params.description;
    }
    const task = await tasksRepo.updateOne(boardId, taskId, params);
    if (!task) throw new Error('notFound');
    return task;
  },

  delete: async (boardId: string, taskId: string) => {
    await tasksRepo.deleteOne(boardId, taskId);
  },
};
