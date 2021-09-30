import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { Board } from './board.model';

export const boardsService = {
  getAll: async () => {
    const result = await boardsRepo.getAll();
    return result;
  },

  getOne: async (boardId: string) => {
    const board = await boardsRepo.getOne(boardId);
    if (!board) throw new Error('notFound');
    return board;
  },

  create: async ({ title, columns }: Board) => {
    if (!title || !columns) {
      throw new Error('badRequest');
    }
    const board = await boardsRepo.create({ title, columns });
    if (!board) throw new Error('board not created');
    return board;
  },

  updateOne: async (boardId: string, body: Board) => {
    const board = await boardsRepo.updateOne(boardId, body);
    if (!board) throw new Error('notFound');
    return board;
  },

  delete: async (boardId: string) => {
    await boardsRepo.delete(boardId);
    tasksRepo.deleteByBoardId(boardId);
  },
};
