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
        courses: courses.filter((c) =>
          c.title.toLowerCase().includes(keyword.toLowerCase())
        ),
        blogs: blogs.filter((b) =>
          b.title.toLowerCase().includes(keyword.toLowerCase())
        )
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

// @route  POST api/user/send_feedback
// @desc   Send feedback to admin
// @access Private
router.post('/send_feedback', authorize(), async (req, res) => {
  try {
    const { title, content, blogId, courseId } = req.body
    const user = await User.findById(req.user.id)
    if (!user) return res.status(400).json({ msg: 'Login Exprired!' })

    const fb = new Feedback({
      user: req.user.id,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      title,
      content,
      blogId: blogId && blogId.length > 0 ? blogId : '',
      courseId: courseId && courseId.length > 0 ? courseId : ''
    })

    await fb.save()
    return res.send(fb)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
