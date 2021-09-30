import { Board } from './board.model';

let boards: Board[] = [];

export const boardsRepo = {
  getAll: async () => boards,

  getOne: async (boardId: string) => {
    const board = boards.find((item) => item.id === boardId);
    return board;
  },

  create: async ({ title, columns }: Board) => {
    const newBoard = new Board({ title, columns });
    boards.push(newBoard);
    return newBoard;
  },

  updateOne: async (boardId: string, body: Board) => {
    const index = boards.findIndex((item) => item.id === boardId);
    if (index < 0) {
      throw new Error('notFound');
    }
    const keys = Object.keys(body);
    (keys as Array<'title'>).forEach((key) => {
      boards[index]![key] = body[key];
    });

    return boards[index];
  },

  delete: async (boardId: string) => {
    const filteredBoards = boards.filter((board) => board.id !== boardId);
    if (boards.length === filteredBoards.length) {
      throw new Error('notFound');
    }
    boards = filteredBoards;
  },
};
