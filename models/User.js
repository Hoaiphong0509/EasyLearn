const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    avatar: { type: String },
    date: {
      type: Date,
      default: Date.now,
    },
    roles: {
      type: [String],
      default: ['student'],
      enum: ['student', 'creator', 'moderator', 'admin'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = User = mongoose.model('user', UserSchema)
