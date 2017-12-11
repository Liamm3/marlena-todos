require('dotenv').config();
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const {todosRoutes} = require('./todos');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', todosRoutes);

app.listen(port);

module.exports = app;
