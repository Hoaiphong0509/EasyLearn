const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const ex = require('email-existence')
const role = require('../helper/role')
const axios = require('axios').default

const { check, validationResult } = require('express-validator')
const { CLOUDINARY_PATH_AVATAR, API_EMAIL } = require('../config')
const { error } = require('consola')
const authorize = require('../middleware/authorize')
const multer = require('multer')
const bufferUpload = require('../helper/bufferUpload')
const multerSingle = multer()
const Verifier = require('email-verifier')
const signJWT = require('../helper/signJWT')

const User = require('../models/User')
const Profile = require('../models/Profile')
const Blog = require('../models/Blog')

// @route  POST api/users/register_student
// @desc   Register student
// @access Public
router.post(
  '/register_student',
  [
    check('name', 'Name is required').not().isEmpty().withMessage('msgErrName'),
    check('email', 'Please include a valid email')
      .isEmail()
      .withMessage('msgErrInvalidEmail'),
    check(
      'password',
      'Please enter a password at least 8 character and contain At least one uppercase, one lower case, one digit.'
    )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
      .withMessage('msgErrPassword'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      //If user exist
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'msgErrEmail' }] })
      }

      const verifier = new Verifier(API_EMAIL)
      verifier.verify(email, async (err, data) => {
        if (err) return res.status(500).json({ errors: [{ msg: err }] })
        if (data.smtpCheck === false)
          return res.status(400).json({ errors: [{ msg: 'msgErrExistEmail' }] })
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

        user = new User({
          name,
          email: email.toLowerCase(),
          avatar,
          password,
        })

        //Encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const token = await signJWT(req.user._id)

        res.json({ token })
      })
    } catch (error) {
      error({ message: `router: ${error.message}`, badge: true })
      res.status(500).send('Server Error')
    }
  }
)

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

    const { skills, phone, ...rest } = req.body

    const profileFields = {
      user: req.user.id,
      phone,
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

// @route  POST api/users/change_avatar
// @desc   Change_avatar
// @access Private
router.post(
  '/change_avatar',
  authorize(),
  multerSingle.single('avatar'),
  async (req, res) => {
    const { buffer } = req.file
    try {
      const { secure_url } = await bufferUpload(
        buffer,
        CLOUDINARY_PATH_AVATAR,
        'avatar',
        800,
        800
      )

      await User.findOneAndUpdate(
        { user: req.user.id },
        { $set: { avatar: secure_url } }
      )

      const token = await signJWT(req.user.id)

      return res.json({ token })
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
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

module.exports = router
