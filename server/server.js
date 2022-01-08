const express = require('express')
const connectDB = require('./helper/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const { success } = require('consola')
const fileUpload = require('express-fileupload')
const { v2: cloudinary } = require('cloudinary')

const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require('./config')

const app = express()

//Constant app
const { PORT } = require('./config')

//Connect DB
connectDB()

//Init Middleware
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// )

// app.use(express.json());

//Define route
app.use('/api/admin', require('./router/admin'))
app.use('/api/auth', require('./router/auth'))
app.use('/api/blog', require('./router/blog'))
app.use('/api/course', require('./router/course'))
app.use('/api/creator', require('./router/creator'))
app.use('/api/profile', require('./router/profile'))
app.use('/api/users', require('./router/users'))
app.use('/api/moderator', require('./router/moderator'))

// SET STORAGE

app.listen(PORT, () =>
  success({ message: `Server started on port ${PORT} 🔥🔥🔥`, badge: true })
)
