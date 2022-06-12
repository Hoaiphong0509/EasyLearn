const express = require('express')
const role = require('../helper/role')
const router = express.Router()
const authorize = require('../middleware/authorize')
const multer = require('multer')
const bufferUpload = require('../utils/bufferUpload')
const multerSingle = multer()
const User = require('../models/User')
const Blog = require('../models/Blog')
const Course = require('../models/Course')
const Banner = require('../models/Banner')
const checkObjectId = require('../middleware/checkObjectId')
const Feedback = require('../models/Feedback')
const normalizeFormatImg = require('../utils/normalizeFormatImg')
const { CLOUDINARY_PATH_BANNER } = require('../config')
const removeImage = require('../utils/removeImage')
const Request = require('../models/Request')
const Profile = require('../models/Profile')
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/Request')

// @route    GET api/moderator/get_users
// @desc     View List Users
// @access   Moderator
router.get('/get_users', authorize(role.Moderator), async (req, res) => {
  try {
    const users = await User.find()
    return res.send(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/moderator/get_request_creator
// @desc     View List Request Register Creator
// @access   Moderator
router.get(
  '/get_request_creator',
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const requestCreators = await Request.find()
      return res.send(requestCreators)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/get_request_creator_detail
// @desc     View Request Detail Register Creator
// @access   Moderator
router.get(
  '/get_request_creator_detail/:id',
  checkObjectId('id'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const requestCreator = await Request.findById(req.params.id)
      const userId = requestCreator.user._id.toString()
      const profile = await Profile.findOne({ user: userId })
      const blogsTemp = await Blog.find()
      blogsData = blogsTemp.filter((blg) => blg.user._id.toString() === userId)

      return res.send({
        request: requestCreator,
        profile,
        blogs: blogsData
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/accept_request_creator/:id
// @desc     Accept Request Register Creator
// @access   Moderator
router.get(
  '/accept_request_creator/:id',
  checkObjectId('id'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const requestCreator = await Request.findById(req.params.id)
      const userId = requestCreator.user._id.toString()
      const email = requestCreator.author.email
      await User.findOneAndUpdate({ email }, { $push: { roles: role.Creator } })
      const notify = new Notify({
        user: req.user.id,
        textVi: `Quản trị viên đã chấp nhận bạn trở thành cộng tác viên.`,
        textEn: `The moderator has accepted you as a creator.`,
        recipient: [{ user: userId }]
      })
      await notify.save()
      await requestCreator.remove()
      return res.send({ msg: 'Accept success' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/denny_request_creator/:id
// @desc     Denny Request Register Creator
// @access   Moderator
router.get(
  '/denny_request_creator/:id',
  checkObjectId('id'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const requestCreator = await Request.findById(req.params.id)
      const userId = requestCreator.user._id.toString()
      const notify = new Notify({
        user: req.user.id,
        textVi: `Quản trị viên đã từ chối bạn trở thành cộng tác viên.`,
        textEn: `The moderator has denied you as a creator.`,
        recipient: [{ user: userId }]
      })
      await notify.save()
      await requestCreator.remove()
      return res.send({ msg: 'Denny success' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/approve/:id_course
// @desc     Approve a course
// @access   Moderator
router.post(
  '/approve_course/:id_course',
  checkObjectId('id_course'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id_course)

      course.status = 'approved'
      if (course.user.toString() !== req.user.id) {
        const notify = new Notify({
          user: req.user.id,
          textVi: `Quản trị viên đã phê duyệt khoá học \`${course.title}\` của bạn.`,
          textEn: `Moderator has approved your \`${course.title}\` course.`,
          recipient: [{ user: course.user }]
        })

        await notify.save()
      }
      await course.save()

      return res.send(course)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/unapprove/:id_course
// @desc     Unapprove a course
// @access   Moderator
router.post(
  '/unapprove_course/:id_course',
  checkObjectId('id_course'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id_course)

      course.status = 'unapproved'
      if (course.user.toString() !== req.user.id) {
        const notify = new Notify({
          user: req.user.id,
          textVi: `Quản trị viên không phê duyệt khoá học \`${course.title}\` của bạn.`,
          textEn: `Moderator has unapproved your \`${course.title}\` course.`,
          recipient: [{ user: course.user }]
        })

        await notify.save()
      }
      await course.save()

      return res.send(course)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/approve/:id_blog
// @desc     Approve a blog
// @access   Moderator
router.post(
  '/approve_blog/:id_blog',
  checkObjectId('id_blog'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id_blog)

      blog.status = 'approved'
      if (blog.user.toString() !== req.user.id) {
        const notify = new Notify({
          user: req.user.id,
          textVi: `Quản trị viên đã phê duyệt bài blog \`${blog.title}\` của bạn.`,
          textEn: `Moderator has approved your \`${blog.title}\` blog.`,
          recipient: [{ user: blog.user }]
        })

        await notify.save()
      }
      await blog.save()

      return res.send(blog)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/unapprove/:id_course
// @desc     Unapprove a course
// @access   Moderator
router.post(
  '/unapprove_blog/:id_blog',
  checkObjectId('id_blog'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id_blog)

      blog.status = 'unapproved'
      if (blog.user.toString() !== req.user.id) {
        const notify = new Notify({
          user: req.user.id,
          textVi: `Quản trị viên không phê duyệt bài blog \`${blog.title}\` của bạn.`,
          textEn: `Moderator has unapproved your \`${blog.title}\` blog.`,
          recipient: [{ user: blog.user }]
        })

        await notify.save()
      }
      await blog.save()

      return res.send(blog)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)
// @route    GET api/moderator/get_feedback
// @desc     Get list feedback
// @access   Moderator
router.get('/get_feedback', authorize(role.Moderator), async (req, res) => {
  try {
    const feedback = await Feedback.find()
    return res.send(feedback)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/moderator/get_feedback/:id
// @desc     Get  feedback
// @access   Moderator
router.get(
  '/get_feedback/:id',
  checkObjectId('id'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id)
      return res.send(feedback)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/get_feedback/:id
// @desc     Delete Feedback
// @access   Moderator
router.delete(
  '/get_feedback/:id',
  checkObjectId('id'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id)
      await feedback.remove()
      res.json({ msg: 'Feedback removed' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/banners
// @desc     Get all banners
// @access   Moderator
router.get('/banners', authorize(role.Moderator), async (req, res) => {
  try {
    const banners = await Banner.find()
    return res.send(banners)
  } catch (error) {
    console.log('error:', error.message)
    res.send('Something went wrong please try again later..')
  }
})

// @route    POST api/moderator/banners
// @desc     Add Banner
// @access   Moderator Admin
router.post('/banners', authorize(role.Moderator), async (req, res) => {
  const { titleVi, titleEn, descVi, descEn, link, color1, color2 } = req.body
  console.log('color1', color1)
  console.log('color2', color2)
  try {
    const newBanner = new Banner({
      titleVi,
      titleEn,
      descVi,
      descEn,
      color1,
      color2,
      link,
      isActive: false,
      img: ''
    })
    const banner = await newBanner.save()
    res.json(banner)
  } catch (error) {
    console.log('error:', error.message)
    res.send('Something went wrong please try again later..')
  }
})

// @route  POST api/moderator/change_img_banner/:id
// @desc   Add image for blog
// @access Moderator
router.put(
  '/change_img_banner/:id',
  authorize(role.Moderator),
  checkObjectId('id'),
  multerSingle.single('img'),
  async (req, res) => {
    const { buffer } = req.file
    try {
      const { secure_url } = await bufferUpload(
        buffer,
        CLOUDINARY_PATH_BANNER,
        'banner',
        848,
        420
      )
      const banner = await Banner.findById(req.params.id)

      if (banner && banner.img && banner.img.length > 0) {
        const firstTndex = banner.img.lastIndexOf('/EasyLearn')
        const format = normalizeFormatImg(banner.img)
        const lastTndex = banner.img.indexOf(format)
        const publidId = banner.img.substring(firstTndex + 1, lastTndex)
        await removeImage(publidId)
      }

      banner.img = secure_url
      await banner.save()

      return res.send(banner)
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

// @route    POST api/moderator/banners/toggle_active/:id
// @desc     Toogle active Banner
// @access   Moderator Admin
router.put(
  '/banners/toggle_active/:id',
  checkObjectId('id'),
  authorize(role.Moderator),
  async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id)
      banner.isActive = !banner.isActive
      await banner.save()
      res.json(banner)
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

// @route    POST api/moderator/banners/delete/:id
// @desc     Add Banner
// @access   Moderator Admin
router.delete(
  '/banners/delete/:id',
  checkObjectId('id'),
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id)
      if (banner.img && banner.img.length > 0) {
        const firstTndex = banner.img.lastIndexOf('/EasyLearn')
        const format = normalizeFormatImg(banner.img)
        const lastTndex = banner.img.indexOf(format)
        const publidId = banner.img.substring(firstTndex + 1, lastTndex)
        await removeImage(publidId)
      }
      await banner.remove()
      res.json({ msg: 'Banner removed' })
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

module.exports = router
