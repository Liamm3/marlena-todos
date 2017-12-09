const getAll = (req, res) => {
  res.status(200).json({
    msg: 'GET /todos'
  });
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
