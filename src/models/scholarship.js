const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScholarshipSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
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

module.exports = mongoose.model('Scholarship', ScholarshipSchema);