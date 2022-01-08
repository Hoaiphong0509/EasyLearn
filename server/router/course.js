const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { error } = require('consola')
const authorize = require('../middleware/authorize')
const checkObjectId = require('../middleware/checkObjectId')
const Course = require('../models/Course')

const role = require('../helper/role')

// @route    GET api/course/mycourses/:id
// @desc     Get mycourse by ID
// @access   Creator
router.get(
  '/mycourses/:id',
  authorize(role.Creator),
  checkObjectId('id'),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)

      if (!course) {
        return res.status(404).json({ msg: 'Course not found' })
      }

      res.json(course)
    } catch (err) {
      console.error(err.message)

      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/course/mycourses
// @desc     Create a mycourse
// @access   Creator
router.post(
  '/mycourses',
  authorize(role.Creator),
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('requires', 'Requires is required').notEmpty(),
  check('gains', 'Gains is required').notEmpty(),
  check('prices', 'Prices is required').notEmpty(),
  check('sections', 'Sections is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { requires, gains, sections, ...rest } = req.body

      const newCourse = new Course({
        owner: req.user.id,
        requires: Array.isArray(requires)
          ? requires
          : requires.split(',').map((require) => ' ' + require.trim()),
        gains: Array.isArray(gains)
          ? gains
          : gains.split(',').map((gain) => ' ' + gain.trim()),
        sections: Array.isArray(sections)
          ? sections.map((section) => ({
              name: section.name,
              videos: section.videos.map(
                (video) => 'https://www.youtube.com/watch?v=' + video
              ),
            }))
          : [sections],
        ...rest,
      })

      await User.findOneAndUpdate(
        { user: req.user.id },
        { $push: { courses: { course: newCourse._id } } }
      )

      const course = await newCourse.save()

      res.json(course)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/course/mycourses/:id_course
// @desc     Edit a mycourse
// @access   Creator
router.put(
  '/mycourses/:id_course',
  authorize(role.Creator),
  checkObjectId('id_course'),
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('requires', 'Requires is required').notEmpty(),
  check('gains', 'Gains is required').notEmpty(),
  check('prices', 'Prices is required').notEmpty(),
  check('sections', 'Sections is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const course = await Course.findById(req.params.id_course)
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' })
    }

    const { requires, gains, sections, ...rest } = req.body

    const coursesFields = {
      owner: req.user.id,
      requires: Array.isArray(requires)
        ? requires
        : requires.split(',').map((require) => ' ' + require.trim()),
      gains: Array.isArray(gains)
        ? gains
        : gains.split(',').map((gain) => ' ' + gain.trim()),
      sections: Array.isArray(sections)
        ? sections.map((section) => ({
            name: section.name,
            videos: section.videos.map(
              (video) => 'https://www.youtube.com/watch?v=' + video
            ),
          }))
        : [sections],
      ...rest,
    }

    try {
      const result = await Course.findByIdAndUpdate(
        req.params.id_course,
        {
          $set: coursesFields,
        },
        { upsert: true }
      )

      res.send(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
