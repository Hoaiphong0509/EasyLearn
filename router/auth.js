const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Profile = require('../models/Profile')
const authorize = require('../middleware/authorize')

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET,
} = require('../config/index')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')

const oAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    console.log(req.user)
    const user = await User.findById(req.user._id)
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/auth/google
// @desc   SignIn/SignUp by Google
// @access Public
router.post('/google', async (req, res) => {
  try {
    const {
      body: { idToken },
    } = req

    await oAuthClient
      .verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })
      .then(async (authRes) => {
        const {
          email,
          email_verified,
          name,
          given_name,
          family_name,
          picture,
        } = await authRes.getPayload()

        if (!email_verified)
          return res
            .status(401)
            .json({ errors: 'Google Login failed, please try again' })

        await User.findOne({ email }).exec(async (err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, SECRET, {
              expiresIn: '3d',
            })
            return res.json({ token })
          }

          console.log('RUNNING HERE')
          const gData = {
            email,
            name,
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
          }

          console.log('newUser Data:', gData)
          const newUser = new User({
            email,
            name,
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
          })
          const profile = new Profile({ user: newUser._id })
          console.log('ALMOST SAVE')
          await newUser.save()
          await profile.save()
          const token = jwt.sign({ _id: newUser._id }, SECRET, {
            expiresIn: '3d',
          })
          return res.json({
            token,
          })

          // await newUser.save(async (newErr, userData) => {
          //   if (newErr)
          //     return res
          //       .status(400)
          //       .json({ errors: 'Failed to sign up with google account' })

          //   const profile = new Profile({ user: userData._id })
          //   await profile.save()
          //   const token = jwt.sign({ _id: userData._id }, SECRET, {
          //     expiresIn: '3d',
          //   })
          //   return res.json({
          //     token,
          //   })
          // })
        })
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ errors: 'Failed to authorize with this google account', err })
      })
  } catch (e) {
    console.log(e)
    res.status(401).send()
  }
})

module.exports = router
