const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

mongoose.connection.once('open', () => {
  console.log('seems open');
}).on('error', () => {
  console.log('eh');
});

module.exports = mongoose;
