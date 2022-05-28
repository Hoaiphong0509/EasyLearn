const express = require('express')
const role = require('../helper/role')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Blog = require('../models/Blog')
const Course = require('../models/Course')
const Profile = require('../models/Profile')
const checkObjectId = require('../middleware/checkObjectId')

// @route    GET api/moderator/get_users
// @desc     View List Users
// @access   Private
router.get(
  '/get_users',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const users = await User.find()
      return res.send(users)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/get_user/:id
// @desc     View List Users
// @access   Private
router.get(
  '/get_user/:id',
  checkObjectId('id'),
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const profile = await Profile.findOne({
        user: user_id
      })
      return res.send({ user, profile })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/get_blogs
// @desc     View List Blogs
// @access   Private
router.get(
  '/get_blogs',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const blogs = await Blog.find()
      return res.send(blogs)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/get_courses
// @desc     View List Courses
// @access   Private
router.get(
  '/get_courses',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const courses = await Course.find()
      return res.send(courses)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/admin
// @desc     Send notify
// @access   Private

// @route    GET api/admin/reject_course/:id_course
// @desc     Reject a course
// @access   Private

// @route    GET api/admin/reject_blog/:id_course
// @desc     Reject a course
// @access   Private

// @route    GET api/admin
// @desc     Change Banner
// @access   Private

// @route    GET api/admin
// @desc     Banned account [optional]
// @access   Private

module.exports = router
