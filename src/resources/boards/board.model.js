const { v4: uuid } = require('uuid');
const Columns = require('./columns.model');

class Board {
  constructor({ id = uuid(), title = 'USER', columns = new Columns() } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
