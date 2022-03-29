const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const authorize = require('../middleware/authorize')
const checkObjectId = require('../middleware/checkObjectId')
const Course = require('../models/Course')

const role = require('../helper/role')
const User = require('../models/User')

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

// @route    GET api/course/get_my_courses
// @desc     Get my courses
// @access   Creator
router.get('/get_mylearning', authorize(role.Creator), async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({ date: -1 })
    res.json(courses)
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

// @route  POST api/course/mycourses
// @desc   Create a course
// @access Creator
router.post(
  '/mycourses',
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('requires', 'Requires is required').notEmpty(),
  check('gains', 'Gains is required').notEmpty(),
  check('prices', 'Prices is required').notEmpty(),
  authorize(),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      const { requires, gains, img, sections, ...rest } = req.body

      const newCourse = new Course({
        user: req.user.id,
        creator: user.name,
        avatar: user.avatar,
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

      await User.findOneAndUpdate(
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

// @route  POST api/course/mycourses/change_img/:id
// @desc   Change img for course
// @access Creator
// router.post(
//   '/mycourses/change_img/:id',
//   authorize(),
//   checkObjectId('id'),
//   multerSingle.single('img'),
//   async (req, res) => {
//     const { buffer } = req.file

//     try {
//       const { secure_url } = await bufferUpload(
//         buffer,
//         CLOUDINARY_PATH_COURSE_IMG,
//         'avatar',
//         854,
//         480
//       )
//       const course = await Course.findByIdAndUpdate(req.params.id, {
//         $set: { img: secure_url },
//       })
//       return res.json(course)
//     } catch (error) {
//       console.log('error:', error.message)
//       res.send('Something went wrong please try again later..')
//     }
//   }
// )

// @route    PUT api/course/mycourses/:id_course
// @desc     Edit a mycourse
// @access   Creator
// router.put(
//   '/mycourses/:id_course',
//   authorize(role.Creator),
//   checkObjectId('id_course'),
//   check('title', 'Title is required').notEmpty(),
//   check('description', 'Description is required').notEmpty(),
//   check('requires', 'Requires is required').notEmpty(),
//   check('gains', 'Gains is required').notEmpty(),
//   check('prices', 'Prices is required').notEmpty(),
//   check('sections', 'Sections is required').notEmpty(),
//   multerSingle.single('img'),
//   async (req, res) => {
//     const errors = validationResult(req.body)
//     const { buffer } = req.file

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     const course = await Course.findById(req.params.id_course)
//     if (!course) {
//       return res.status(404).json({ msg: 'Course not found' })
//     }

//     const { requires, gains, sections, ...rest } = req.body

//     const coursesFields = {
//       owner: req.user.id,
//       requires: Array.isArray(requires)
//         ? requires
//         : requires.split(',').map((require) => ' ' + require.trim()),
//       gains: Array.isArray(gains)
//         ? gains
//         : gains.split(',').map((gain) => ' ' + gain.trim()),
//       sections: Array.isArray(sections)
//         ? sections.map((section) => ({
//             name: section.name,
//             videos: section.videos.map(
//               (video) => 'https://www.youtube.com/watch?v=' + video
//             ),
//           }))
//         : [sections],
//       ...rest,
//     }

//     try {
//       const result = await Course.findByIdAndUpdate(
//         req.params.id_course,
//         {
//           $set: coursesFields,
//         },
//         { upsert: true }
//       )

//       res.send(result)
//     } catch (err) {
//        console.log(err.message)
//       res.status(500).send('Server Error')
//     }
//   }
// )

module.exports = router
