const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
})

module.exports = Role = mongoose.model('role', RoleSchema)
