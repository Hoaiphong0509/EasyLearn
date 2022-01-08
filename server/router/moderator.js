const express = require('express')

const router = express.Router()

// @route  POST api/moderator/approved/:id_course
// @desc   Approved course
// @access Moderator
router.get('/approved/:id_course', (req, res) => res.send('creator route'))

module.exports = router
