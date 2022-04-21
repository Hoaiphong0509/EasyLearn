const mongoose = require('mongoose')
const { DB, DB_LOCALE } = require('../config')

const connectDB = async () => {
  try {
    mongoose.connect(DB, {
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected 📑📑📑`)
  } catch (err) {
    console.log(`Unable to connect with mongoDB 🚫🚫🚫 \n${err}`)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
