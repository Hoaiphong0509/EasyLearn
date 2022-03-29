const express = require('express')
const logger = require('morgan')
const connectDB = require('./utils/db')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

//Connect DB
connectDB()

app.use(cors())
// app.use(logger('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🔥🔥🔥`)
})
