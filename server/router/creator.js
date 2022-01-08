const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { error } = require('consola')
const authorize = require('../middleware/authorize')
const checkObjectId = require('../middleware/checkObjectId')

const Course = require('../models/Course')
const User = require('../models/User')

const role = require('../helper/role')

// @route  GET api/creator/mycourses
// @desc   Get all courses make by me
// @access Creator
router.get('/mycourses', authorize(role.Creator), async (req, res) => {
  try {
    const courses = await Course.find({ owner: req.user.id })

    res.send(courses)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
