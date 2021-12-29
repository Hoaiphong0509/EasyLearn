const express = require('express')
const authorize = require('../middleware/authorize')
const role = require('../helper/role')

const router = express.Router()

// @route  GET api/admin
// @desc   Test route
// @access PUBLIC
router.get('/', authorize(role.Admin), (req, res) =>
  res.send('admin route')
)

module.exports = router
