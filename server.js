const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to index'
  });
});

app.listen(port, () => {
  console.log(`App listening to port ${port}.`);
});
