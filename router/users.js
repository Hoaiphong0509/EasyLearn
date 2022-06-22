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
const Notify = require('../models/Notify')
const Feedback = require('../models/Feedback')
const Banner = require('../models/Banner')
const Request = require('../models/Request')

// @route  POST api/users/register_creator
// @desc   Register creator
// @access Student
router.post('/register_creator', authorize(), async (req, res) => {
  try {
    const { content } = req.body
    const user = await User.findById(req.user.id)
    const requestRegistor = new Request({
      user: req.user.id,
      author: {
        email: user.email,
        name: user.name,
        avatar: user.avatar
      },
      content
    })

    await requestRegistor.save()
    return res.send({ msg: 'Success' })
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

// @route    DELETE api/user
// @desc     Delete user
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const profile = await Profile.findOne({ user: req.user.id })
    const blog = await Blog.findOne({ user: req.user.id })
    const course = await Course.findOne({ user: req.user.id })

    if (!user && !profile)
      return res.status(400).json({ msg: 'User not found' })

    if (blog && course) {
      Course.deleteMany({ user: req.user.id })
      Blog.deleteMany({ user: req.user.id })
      const notify = new Notify({
        user: req.user.id,
        textVi: `Tài khoản \`${user.name}\` đã bị xóa nên khóa học \`${course.title}\` sẽ bị xóa theo.`,
        textEn: `The \'${user.name}\' account has been deleted so the \'${course.title}\' course will be deleted accordingly.`,
        recipient: course.students
      })

      await notify.save()
      await blog.remove()
      await course.remove()
    }

    res.json({ msg: 'Remove user successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

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
        courses: courses.filter(
          (c) =>
            c.title.toLowerCase().startsWith(keyword.toLowerCase()) &&
            c.status === 'approved'
        ),
        blogs: blogs.filter(
          (b) =>
            b.title.toLowerCase().startsWith(keyword.toLowerCase()) &&
            b.status === 'approved'
        )
      }

      if (result.courses.length == 0 && result.blogs.length == 0)
        return res.send({ courses: [], blogs: [] })

      res.send(result)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route  POST api/user/send_feedback
// @desc   Send feedback to admin
// @access Private
router.post('/send_feedback', async (req, res) => {
  try {
    const { avatar, email, title, content } = req.body
    const fb = new Feedback({
      author: {
        avatar: avatar ? avatar : '',
        email: email ? email : 'anonymous'
      },
      title,
      content
    })

    await fb.save()
    return res.send(fb)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/user/get_banners_active
// @desc   Get all banners active
// @access Public
router.get('/get_banners_active', async (req, res) => {
  try {
    const banners = await Banner.find()
    const result = banners.filter((bn) => bn.isActive)
    return res.send(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
