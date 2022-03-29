const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    knowAs: {
      type: String,
    },
    status: {
      type: String,
      default: 'activity',
    },
    skills: {
      type: [String],
    },
    bio: {
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
        },
        company: {
          type: String,
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
        },
        degree: {
          type: String,
        },
        fieldofstudy: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
    date: {
      type: Date,
      default: Date.now,
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
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        creator: {
          type: String,
        },
        avatar: {
          type: String,
        },
        img: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('profile', ProfileSchema)
