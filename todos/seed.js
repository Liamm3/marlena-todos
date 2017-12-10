const Todo = require('./model');
const {ObjectID} = require('mongodb');

const todos = [
  {_id: new ObjectID(), text: 'First test todo', completed: true},
  {_id: new ObjectID(), text: 'Second test todo', completed: false},
];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
};
