const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    roles: {
      type: [String],
      default: ['student'],
      enum: ['student', 'creator', 'moderator', 'admin'],
    },
    blogs: [
      {
        blog: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    courses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    learnings: [
      {
        learning: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = User = mongoose.model('user', UserSchema)
