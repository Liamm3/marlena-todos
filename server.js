require('./config/config');

const express = require('express');
const mongoose = require('./db/mongoose');

const { todosRoutes } = require('./todos')
const app = express();
const port = process.env.PORT || 3000;

app.use('/api', todosRoutes);

app.listen(port, () => {
  console.log(`App listening to port ${port}.`);
});

module.exports = app;
