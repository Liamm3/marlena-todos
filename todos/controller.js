const Todo = require('./model');
const { ObjectID } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      todos
    });
  } catch (e) {
    res.status(400).json();
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  
  if (!ObjectID.isValid(id)) {
    res.status(404).json();
  }

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json();
    }
    
    res.json({ todo });
  } catch (e) {
    res.status(400).json()
  }
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
