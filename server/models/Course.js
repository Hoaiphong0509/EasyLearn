const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requires: {
      type: [String],
      required: true,
    },
    gains: {
      type: [String],
      required: true,
    },
    punchLike: {
      type: String,
    },
    status: {
      type: String,
      default: 'approved',
      enum: ['unapproved', 'approved'],
    },
    sections: [
      {
        name: {
          type: String,
          required: true,
        },
        videos: {
          type: [String],
          required: true,
        },
      },
    ],
    prices: {
      type: String,
      default: 50,
      required: true,
    },
    students: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('course', CourseSchema)
