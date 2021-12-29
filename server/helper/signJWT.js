const jwt = require('jsonwebtoken')
const { error } = require('consola')
const { SECRET, TOKEN_EXPRIRES } = require('../config')

const signJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user: {
        id: userId,
      },
    }

    jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPRIRES }, (err, token) => {
      if (err) {
        error({ msg: `Error in signJWT: ${err.message}`, badge: true })
        return reject(err)
      }
      resolve(token)
    })
  })
}

module.exports = signJWT
