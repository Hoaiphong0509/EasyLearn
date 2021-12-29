const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { error } = require('consola')
const { SECRET } = require('../config')

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }
  return (req, res, next) => {
    try {
      jwt.verify(req.header('x-auth-token'), SECRET, async (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' })
        } else {
          req.user = decoded.user
          const user = await User.findById(req.user.id).select('-password')
          if (roles.length && !user.role.includes(roles)) {
            return res.status(401).json({ message: 'Unauthorized' })
          }

          // authentication and authorization successful
          next()
        }
      })
    } catch (err) {
      error({ message: 'something wrong with auth middleware', badge: true })
      res.status(500).json({ msg: 'Server Error' })
    }
  }
}
module.exports = authorize
