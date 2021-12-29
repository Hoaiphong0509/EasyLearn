const express = require('express')

const router = express.Router()

// @route  GET api/users
// @desc   Test route
// @access PUBLIC
router.get('/', (req, res) => res.send('creator route'))

module.exports = router
