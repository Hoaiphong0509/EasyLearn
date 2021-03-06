const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    author: {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
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
        videos: [
          {
            name: {
              type: String,
              required: true,
            },
            link: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    students: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
        text: {
          type: String,
          required: true,
        },
        author: {
          name: {
            type: String,
          },
          avatar: {
            type: String,
          },
        },
        videoId: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('course', CourseSchema)
