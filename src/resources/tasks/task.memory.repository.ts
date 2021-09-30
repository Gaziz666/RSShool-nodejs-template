import { Task } from './task.model';

let tasks: Array<Task> = [];

export const tasksRepo = {
  getAll: async (boardId: string): Promise<Array<Task>> => {
    const result = tasks.filter((item) => item.boardId === boardId);
    return result;
  },

  getOne: async (
    boardId: string,
    taskId: string
  ): Promise<Task | undefined> => {
    const task = tasks.find(
      (item) => item.id === taskId && item.boardId === boardId
    );
    return task;
  },

  create: async ({
    title,
    order,
    description,
    userId = null,
    boardId,
    columnId,
  }: Task): Promise<Task> => {
    const newTask = new Task({
      title,
      order,
      description,
      userId: userId || undefined,
      boardId,
      columnId,
    });
    tasks.push(newTask);
    return newTask;
  },

  updateOne: async (
    boardId: string,
    taskId: string,
    body: Task
  ): Promise<Task> => {
    const index = tasks.findIndex(
      (item) => item.id === taskId && item.boardId === boardId
    );
    if (index < 0) {
      throw new Error('notFound');
    }
    const keys = Object.keys(body);
    (keys as Array<'title' | 'description' | 'boardId' | 'columnId'>).forEach(
      (key: 'title' | 'description' | 'boardId' | 'columnId') => {
        tasks[index]![key] = body[key];
      }
    );

    return tasks[index]!;
  },

  delete: async (boardId: string, taskId: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    if (tasks.length === filteredTasks.length) {
      throw new Error('notFound');
    }
    tasks = filteredTasks;
  },

  deleteByBoardId: async (boardId: string) => {
    const filteredTasks = tasks.filter((task) => task.boardId !== boardId);
    if (tasks.length === filteredTasks.length) {
      throw new Error('notFound');
    }
    tasks = filteredTasks;
  },

  deleteUserId: async (userId: string) => {
    const mapTask = tasks.map((task) => {
      const newTask = task;
      if (newTask.userId === userId) {
        newTask.userId = null;
      }
      return newTask;
    });
    tasks = mapTask;
  },
};
