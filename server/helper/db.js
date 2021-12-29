const mongoose = require('mongoose')
const { DB } = require('../config')
const { success, error } = require('consola')

const connectDB = async () => {
  try {
    mongoose.connect(DB, {
      useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    })

    success({ message: `MongoDB Connected 📑📑📑 \n${DB}`, badge: true })
  } catch (err) {
    error({
      message: `Unable to connect with mongoDB 🚫🚫🚫 \n${err}`,
      badge: true,
    })
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
