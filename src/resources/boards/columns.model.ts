import { v4 as uuid } from 'uuid';

export class Columns {
  id?: string;
  title: string;
  order: number;

  constructor({ id = uuid(), title = 'title', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
