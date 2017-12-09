const express = require('express');
const todosController = require('./controller');
const router = new express.Router();

router.get('/todos', todosController.getAllTodos);

module.exports = router;
