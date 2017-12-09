const Todo = require('./model');

const todos = [
  { text: 'First test todo', completed: true },
  { text: 'Second test todo', completed: false}
];

const populateTodos = done => {
  Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = populateTodos;
