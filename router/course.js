const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const authorize = require('../middleware/authorize')
const multer = require('multer')
const bufferUpload = require('../utils/bufferUpload')
const multerSingle = multer()
const checkObjectId = require('../middleware/checkObjectId')

const Course = require('../models/Course')
const User = require('../models/User')
const Notify = require('../models/Notify')
const Profile = require('../models/Profile')

const { CLOUDINARY_PATH_COURSE_IMG, COURSE_IMG_DEFAULT } = require('../config')
const role = require('../helper/role')

// @route    GET api/course
// @desc     Get courses
// @access   PUBLIC
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ date: -1 })
    res.json(courses)
  } catch (err) {
    console.log(err.message)

    res.status(500).send('Server Error')
  }
})

// @route    GET api/course/get_courses/:user_id
// @desc     Get all courses by user Id
// @access   PUBLIC
router.get(
  '/get_courses/:user_id',
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const course = await Course.find().sort({ date: -1 })
      const result = course.filter(
        (b) => b.user._id.toString() === req.params.user_id
      )
      res.send(result)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/course/get_learnings
// @desc     Get my learnings
// @access   Student, Creator
router.get('/get_mylearnings', authorize(), async (req, res) => {
  try {
    const learnings = []
    const courses = await Course.find()
    courses.forEach((c) => {
      c.students.forEach((s) => {
        if (s.user._id.toString() === req.user.id) {
          learnings.push(c)
        }
      })
    })

    res.json(learnings)
  } catch (err) {
    console.log(err.message)

    res.status(500).send('Server Error')
  }
})

// @route    GET api/course/get_my_courses
// @desc     Get my courses
// @access   Creator
router.get('/get_mycourses', authorize(), async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({ date: -1 })
    res.json(courses)

    // const blogs = await Blog.find().sort({ date: -1 })
    // const result = blogs.filter((b) => b.user._id.toString() === req.user.id)
    // res.send(result)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/course/:id
// @desc     Get course by ID
// @access   Creator
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' })
    }

    res.json(course)
  } catch (err) {
    console.log(err.message)

    res.status(500).send('Server Error')
  }
})

// @route  POST api/course
// @desc   Create a course
// @access Creator
router.post(
  '/',
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('requires', 'Requires is required').notEmpty(),
  check('gains', 'Gains is required').notEmpty(),
  check('prices', 'Prices is required').notEmpty(),
  authorize(),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      const { requires, gains, img, sections, ...rest } = req.body

      const newCourse = new Course({
        user: req.user.id,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        requires: Array.isArray(requires)
          ? requires
          : requires.split(',').map((require) => ' ' + require.trim()),
        gains: Array.isArray(gains)
          ? gains
          : gains.split(',').map((gain) => ' ' + gain.trim()),
        img: COURSE_IMG_DEFAULT,
        sections: Array.isArray(sections)
          ? sections.map((section) => ({
              name: section.name,
              videos: section.videos.map((video) => ({
                name: video.name,
                link: video.link,
              })),
            }))
          : [sections],
        ...rest,
      })

      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { courses: { course: newCourse._id } } }
      )

      const course = await newCourse.save()

      res.json(course)
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

// @route  POST api/course/change_img/:id
// @desc   Change img for course
// @access Creator
router.post(
  '/change_img/:id',
  authorize(),
  checkObjectId('id'),
  multerSingle.single('img'),
  async (req, res) => {
    const { buffer } = req.file

    try {
      const { secure_url } = await bufferUpload(
        buffer,
        CLOUDINARY_PATH_COURSE_IMG,
        'avatar',
        854,
        480
      )
      const course = await Course.findByIdAndUpdate(req.params.id, {
        $set: { img: secure_url },
      })
      return res.json(course)
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

// @route    PUT api/course/edit/:id
// @desc     Edit a mycourse
// @access   Creator
router.put(
  '/edit/:id',
  authorize(role.Creator),
  checkObjectId('id'),
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('requires', 'Requires is required').notEmpty(),
  check('gains', 'Gains is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req.body)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' })
    }

    const { requires, gains, sections, ...rest } = req.body

    const coursesFields = {
      requires: Array.isArray(requires)
        ? requires
        : requires.split(',').map((require) => ' ' + require.trim()),
      gains: Array.isArray(gains)
        ? gains
        : gains.split(',').map((gain) => ' ' + gain.trim()),
      sections: Array.isArray(sections)
        ? sections.map((section) => ({
            name: section.name,
            videos: section.videos.map((video) => ({
              name: video.name,
              link: video.link,
            })),
          }))
        : [sections],
      ...rest,
    }

    try {
      const result = await Course.findByIdAndUpdate(
        req.params.id,
        {
          $set: coursesFields,
        },
        { upsert: true }
      )

      res.send(result)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/course/comment/:id_course/:id_video
// @desc     Comment on a course
// @access   Private
router.post(
  '/comment/:id_course/:id_video',
  authorize(),
  checkObjectId('id_course'),
  checkObjectId('id_video'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const idCourse = req.params.id_course
      const idVideo = req.params.id_video
      const user = await User.findById(req.user.id)
      // const profile = await Profile.findOne({ user: req.user.id })
      const course = await Course.findById(idCourse)
      let videoName
      const videos = course.sections.filter((s) => {
        return s.videos.filter((v) => {
          if (v._id.toString() === idVideo) videoName = v.name
          return v._id.toString() === idVideo
        })
      })
      videos.filter((v) => v._id === idVideo)
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        videoId: idVideo,
      }

      course.comments.unshift(newComment)

      if (course.user.toString() !== req.user.id) {
        const notify = new Notify({
          user: req.user.id,
          textVi: `${user.name} đã comment video \`${videoName}\` của khoá \`${course.title}\`.`,
          textEn: `${user.name} commented on video \`${videoName}\` of \`${course.title}\`.`,
          recipient: [{ user: course.user }],
        })

        await notify.save()
      }

      await course.save()

      res.json(course.comments)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/blog/comment/:id_course/:id_section/:id_video/:id_comment
// @desc     Delete comment
// @access   Private
router.delete(
  '/comment/:id_course/:id_comment',
  checkObjectId('id_course'),
  checkObjectId('id_comment'),
  authorize(),
  async (req, res) => {
    try {
      const idCourse = req.params.id_course
      const idComment = req.params.id_comment

      const course = await Course.findById(idCourse)

      // Pull out comment
      const comment = course.comments.find(
        (comment) => comment.id === idComment
      )
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' })
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      }

      course.comments = course.comments.filter(({ id }) => id !== idComment)

      await course.save()

      res.json(course.comments)
    } catch (err) {
      console.log(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/course/:id
// @desc     Delate a course
// @access   Creator
router.delete(
  '/:id',
  authorize(role.Creator),
  checkObjectId('id'),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)
      const profile = await Profile.findById(req.user.id)

      if (!course) {
        return res.status(404).json({ msg: 'course not found' })
      }

      // Check user
      if (course.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      }

      const notify = new Notify({
        user: req.user.id,
        textVi: `Khóa học ${course.title} đã bị xóa.`,
        textEn: `${course.title} has been deleted.`,
        recipient: course.students,
      })

      if (course.students.length > 0) await notify.save()

      await course.remove()

      res.json(profile.course)
    } catch (err) {
      console.log(err.message)

      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
