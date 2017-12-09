const express = require('express');
const todosController = require('./controller');
const router = new express.Router();

router.get('/todos', todosController.getAll);
router.get('/todos/:id', todosController.getOne);
router.post('/todos', todosController.create);
router.put('/todos/:id', todosController.update);
router.delete('/todos/:id', todosController.remove);

module.exports = router;
