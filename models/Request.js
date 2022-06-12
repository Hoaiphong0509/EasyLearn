const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  author: {
    email: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    }
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

module.exports = mongoose.model('request', RequestSchema)
