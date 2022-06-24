const express = require('express')
const connectDB = require('./utils/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const { v2: cloudinary } = require('cloudinary')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/.env' })
}

const app = express()
const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = require('./config')

const PORT = process.env.PORT || 5000

connectDB()

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/admin', require('./router/admin'))
app.use('/api/auth', require('./router/auth'))
app.use('/api/blog', require('./router/blog'))
app.use('/api/course', require('./router/course'))
app.use('/api/creator', require('./router/creator'))
app.use('/api/moderator', require('./router/moderator'))
app.use('/api/profile', require('./router/profile'))
app.use('/api/users', require('./router/users'))
app.use('/api/notify', require('./router/notify'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client', 'build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🔥🔥🔥`)
})
