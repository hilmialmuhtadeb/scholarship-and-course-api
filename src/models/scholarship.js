const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScholarshipSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  deadline: {
    type: Date,
    required: false,
  },
  category: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: Object,
    required: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);