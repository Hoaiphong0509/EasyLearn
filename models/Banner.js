const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BannerSchema = new Schema({
  titleVi: {
    type: String,
    required: true
  },
  titleEn: {
    type: String,
    required: true
  },
  descVi: {
    type: String,
    required: true
  },
  descEn: {
    type: String,
    required: true
  },
  color1: {
    type: String,
    required: true
  },
  color2: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('banner', BannerSchema)
