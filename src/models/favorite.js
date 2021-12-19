const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Favorite = new Schema({
  username: {
    type: String,
    required: true,
  },
  scholarshipId: {
    type: ObjectId,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Favorite', Favorite);

