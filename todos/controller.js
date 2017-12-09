const Todo = require('./model');

const getAll = async (req, res) => {
  try {
    const todos = await Todo.find({});
    
    res.status(200).json({
      todos
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getOne = (req, res) => {
  res.status(200).json({
    msg: 'GET /todos/:id'
  });
};

const create = (req, res) => {
  res.status(200).json({
    msg: 'POST /todos'
  });
};

const update = (req, res) => {
  res.status(200).json({
    msg: 'PUT /todos/:id'
  });
};

const remove = (req, res) => {
  res.status(200).json({
    msg: 'DELETE /todos/:id'
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
