const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  body: {
    required: true,
    type: String,
    trim: true,
    minlength: 1
  },
  completed: {
    default: false,
    type: Boolean,
  }
});

module.exports = mongoose.model('Todo', todoSchema);
