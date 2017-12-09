const getAllTodos = (req, res) => {
  res.status(200).json({
    msg: 'controller woah'
  })
};

module.exports = {
  getAllTodos
};
