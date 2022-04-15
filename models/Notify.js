const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotifySchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    textVi: {
      type: String,
      required: true,
    },
    textEn: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    recipient: [
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

module.exports = Notify = mongoose.model('notify', NotifySchema)
