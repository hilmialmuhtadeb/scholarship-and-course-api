const mongoose = require('mongoose');
const { Schema } = mongoose;

const Scholarship = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: false,
  },
  deadline: {
    type: Date,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', Scholarship);