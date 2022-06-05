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

// @route    GET api/moderator/get_users
// @desc     View List Users
// @access   Private
router.get(
  '/get_users',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const users = await User.find()
      return res.send(users)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/approve/:id_course
// @desc     Approve a course
// @access   Private
router.post(
  '/approve_course/:id_course',
  checkObjectId('id_course'),
  authorize(role.Admin, role.Moderator),
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
// @access   Private
router.post(
  '/unapprove_course/:id_course',
  checkObjectId('id_course'),
  authorize(role.Admin, role.Moderator),
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
// @access   Private
router.post(
  '/approve_blog/:id_blog',
  checkObjectId('id_blog'),
  authorize(role.Admin, role.Moderator),
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
// @access   Private
router.post(
  '/unapprove_blog/:id_blog',
  checkObjectId('id_blog'),
  authorize(role.Admin, role.Moderator),
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
// @access   Private
router.get(
  '/get_feedback',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const feedback = await Feedback.find()
      return res.send(feedback)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/get_feedback/:id
// @desc     Get  feedback
// @access   Private
router.get(
  '/get_feedback/:id',
  checkObjectId('id'),
  authorize(role.Admin, role.Moderator),
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
// @access   Private
router.delete(
  '/get_feedback/:id',
  checkObjectId('id'),
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id)
      await feedback.remove()
      es.json({ msg: 'Feedback removed' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/moderator/banners
// @desc     Get all banners
// @access   Private
router.get(
  '/banners',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    try {
      const banners = await Banner.find()
      return res.send(banners)
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

// @route    POST api/moderator/banners
// @desc     Add Banner
// @access   Moderator Admin
router.post(
  '/banners',
  authorize(role.Admin, role.Moderator),
  async (req, res) => {
    const { titleVi, titleEn, descVi, descEn, link, color1, color2 } = req.body
    console.log("color1", color1);
    console.log("color2", color2);
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
  }
)

// @route  POST api/moderator/change_img_banner/:id
// @desc   Add image for blog
// @access Private
router.put(
  '/change_img_banner/:id',
  authorize(role.Admin, role.Moderator),
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
        console.log('running here')
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
  authorize(role.Admin, role.Moderator),
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
      await banner.remove()
      res.json({ msg: 'Banner removed' })
    } catch (error) {
      console.log('error:', error.message)
      res.send('Something went wrong please try again later..')
    }
  }
)

module.exports = router
