const Todo = require('./model');
const { ObjectID } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (e) {
    res.status(400).send();
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).send();
    }
    
    res.send(todo);
  } catch (e) {
    res.status(400).send()
  }
};

const create = async (req, res) => {
  const todo = new Todo({ text: req.body.text });

  try {
    const doc = await todo.save();
    
    res.send(doc);
  } catch (e) {
    res.status(400).send();
  }
};

const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    res.status(400).send();
  }

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!todo) {
      res.status(404).send();
    }

    res.send(todo);
  } catch (e) {
    res.status(400).send();
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndRemove(id);
    res.send(todo);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
