const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const authorize = require('../middleware/authorize')
const checkObjectId = require('../middleware/checkObjectId')
const normalize = require('normalize-url')
const Profile = require('../models/Profile')
const Course = require('../models/Course')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', authorize(), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    })

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/profile/me
// @desc   Update Profile
// @access Private
router.post('/me', authorize(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(400).json({ errors: errors.array() })
  }

  const { youtube, twitter, instagram, linkedin, facebook, skills, ...rest } =
    req.body

  const profileFields = {
    user: req.user.id,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map((skill) => ' ' + skill.trim()),
    ...rest,
  }

  const socialFields = { youtube, twitter, instagram, linkedin, facebook }

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalize(value, { forceHttps: true })
  }

  profileFields.social = socialFields

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    return res.json(profile)
  } catch (err) {
    console.log({ errors: errors.array() })
    return res.status(500).send('Server Error')
  }
})

// @route    GET api/profile/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate('user', ['name', 'avatar'])

      if (!profile) return res.status(400).json({ msg: 'Profile not found' })

      return res.json(profile)
    } catch (err) {
      console.log(err.message)
      return res.status(500).json({ msg: 'Server error' })
    }
  }
)

// @route  POST api/profile/add_learning/:id
// @desc   Add course into lerning
// @access Private
router.post(
  '/add_learning/:id',
  authorize(),
  checkObjectId('id'),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)

      if (!course) return res.status(400).json({ msg: 'Course not available' })
      await course.students.push({ user: req.user.id })

      await course.save()

      res.json({ msg: 'Add courses successfully' })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
//TODO

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  authorize(),
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check(
    'from',
    'From date is required and needs to be from the past'
  ).notEmpty(),
  // .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })

      profile.experience.unshift(req.body)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', authorize(), async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id })

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    )

    await foundProfile.save()
    return res.status(200).json(foundProfile)
  } catch (error) {
    console.log(err.message)
    return res.status(500).json({ msg: 'Server error' })
  }
})

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  authorize(),
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check(
    'from',
    'From date is required and needs to be from the past'
  ).notEmpty(),
  // .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })

      profile.education.unshift(req.body)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', authorize(), async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id })
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    )
    await foundProfile.save()
    return res.status(200).json(foundProfile)
  } catch (error) {
    console.log(err.message)
    return res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
