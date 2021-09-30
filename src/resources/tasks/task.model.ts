import { v4 as uuid } from 'uuid';

export class Task {
  id?: string;
  userId: string | null;
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string;

  constructor({
    id = uuid(),
    title = 'USER',
    order = 0,
    description = '',
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
