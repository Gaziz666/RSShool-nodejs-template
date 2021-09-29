const { v4: uuid } = require('uuid');

class Columns {
  constructor({ id = uuid(), title = 'title', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Columns;
