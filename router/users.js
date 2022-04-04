const express = require('express')
const router = express.Router()
const role = require('../helper/role')

const { check, validationResult } = require('express-validator')
const authorize = require('../middleware/authorize')
const signJWT = require('../utils/signJWT')

const User = require('../models/User')
const Profile = require('../models/Profile')
const Blog = require('../models/Blog')
const Course = require('../models/Course')
const checkObjectId = require('../middleware/checkObjectId')

// @route  POST api/users/register_creator
// @desc   Register creator
// @access Student
router.post('/register_creator', authorize(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    await User.findOneAndUpdate(
      { user: req.user.id },
      { $push: { roles: role.Creator } }
    )

    const token = await signJWT(req.user.id)

    res.json({ token })
  } catch (err) {
    return res.status(500).send('Server Error')
  }
})

// @route  GET api/user/myblogs
// @desc   Get all blogs make by me
// @access Private
router.get('/myblogs', authorize(), async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id })

    res.send(blogs)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/user/add_learning/:id_course
// @desc   Add course into lerning
// @access Private
router.post(
  '/add_learning/:id_course',
  authorize(),
  checkObjectId('id_course'),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id_course)

      const { _id, title, description, creator, avatar, img } = course

      if (!course) return res.status(400).json({ msg: 'Course not available' })

      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          learnings: {
            learning: _id,
            title,
            description,
            creator,
            avatar,
            img,
          },
        },
      })

      res.json({ msg: 'Add courses successfully' })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route  POST api/user/search
// @desc   Search
// @access Private
router.post(
  '/search',
  check('keyword', 'Keyword is required').notEmpty(),
  async (req, res) => {
    try {
      const { keyword } = req.body
      const courses = await Course.find()
      const blogs = await Blog.find()

      const result = {
        courses: courses.filter((c) =>
          c.title.toLowerCase().includes(keyword.toLowerCase())
        ),
        blogs: blogs.filter((b) =>
          b.title.toLowerCase().includes(keyword.toLowerCase())
        ),
      }

      if (result.courses.length == 0 && result.blogs.length == 0)
        return res.status(400).json({ msg: "Couldn't find anything" })

      console.log(result)
      res.send(result)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
