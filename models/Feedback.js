const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  author: {
    name: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  blogId: {
    type: String
  },
  courseId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('feedback', FeedbackSchema)
