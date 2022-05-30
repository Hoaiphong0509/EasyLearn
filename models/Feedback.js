const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = new Schema({
  author: {
    avatar: { type: String },
    email: {
      type: String,
      default: 'anonymous'
    },
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('feedback', FeedbackSchema)
