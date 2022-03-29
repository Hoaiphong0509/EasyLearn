const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const role = require('../helper/role')
const axios = require('axios').default
const passport = require('passport')

const { check, validationResult } = require('express-validator')
const authorize = require('../middleware/authorize')
const signJWT = require('../utils/signJWT')

const User = require('../models/User')
const Profile = require('../models/Profile')
const Blog = require('../models/Blog')
const Course = require('../models/Course')
const checkObjectId = require('../middleware/checkObjectId')


// @route  POST api/users/register_student
// @desc   Register student
// @access Public
// router.post(
//   '/register_student',
//   [
//     check('name', 'Name is required').not().isEmpty().withMessage('msgErrName'),
//     check('email', 'Please include a valid email')
//       .isEmail()
//       .withMessage('msgErrInvalidEmail'),
//     check(
//       'password',
//       'Please enter a password at least 8 character and contain At least one uppercase, one lower case, one digit.'
//     )
//       .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
//       .withMessage('msgErrPassword'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     const { name, email, password } = req.body

//     try {
//       //If user exist
//       let user = await User.findOne({ email })
//       if (user) {
//         return res.status(400).json({ errors: [{ msg: 'msgErrEmail' }] })
//       }

//       //TODO CHECK REAL EMAIL
//       // const verifier = new Verifier(API_EMAIL)
//       // verifier.verify(email, async (err, data) => {
//       //   if (err) return res.status(500).json({ errors: [{ msg: err }] })
//       //   if (data.smtpCheck === false)
//       //     return res.status(400).json({ errors: [{ msg: 'msgErrExistEmail' }] })
//       // })

//       const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

//       user = new User({
//         name,
//         email: email.toLowerCase(),
//         avatar,
//         password,
//       })

//       //Encrypt password
//       const salt = await bcrypt.genSalt(10)
//       user.password = await bcrypt.hash(password, salt)

//       await user.save()

//       const token = await signJWT(user.id)

//       res.json({ token })
//     } catch (error) {
//       error({ message: `router: ${error.message}`, badge: true })
//       res.status(500).send('Server Error')
//     }
//   }
// )

// @route  POST api/users/register_creator
// @desc   Register creator
// @access Admin, Moderator, Student
router.post(
  '/register_creator',
  authorize(role.Admin, role.Moderator, role.Student),
  check('skills', 'Skills is required').notEmpty(),
  check('phone', 'Phone is invalid').matches(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'i'
  ),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      error({ errors: errors.array(), badge: true })
      return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user.id).select('-password')

    const { skills, phone, ...rest } = req.body

    const profileFields = {
      user: req.user.id,
      phone,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest,
    }

    try {
      await User.findOneAndUpdate(
        { user: req.user.id },
        { $push: { roles: role.Creator } }
      )

      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )

      const token = await signJWT(req.user.id)

      res.json({ token })
      // return res.json(profile)
    } catch (err) {
      error({ message: `router: ${error.message}`, badge: true })
      return res.status(500).send('Server Error')
    }
  }
)

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
      const result = {
        courses: [],
        blogs: [],
      }

      const { keyword } = req.body
      const courses = await Course.find()
      const blogs = await Blog.find()

      result.courses = courses.filter((c) =>
        c.title.toLowerCase().includes(keyword.toLowerCase())
      )
      result.blogs = blogs.filter((b) =>
        b.title.toLowerCase().includes(keyword.toLowerCase())
      )

      if (result.courses.length == 0 && result.blogs.length)
        return res.status(400).json({ msg: "Couldn't find anything" })

      res.send(result)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
