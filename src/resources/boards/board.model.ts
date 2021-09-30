import { v4 as uuid } from 'uuid';
import { Columns } from './columns.model';

export class Board {
  id?: string;
  title: string;
  columns: Columns;
  constructor({ id = uuid(), title = 'USER', columns = new Columns({}) } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
