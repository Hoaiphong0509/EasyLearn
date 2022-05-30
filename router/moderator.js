const express = require('express')
const role = require('../helper/role')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Blog = require('../models/Blog')
const Course = require('../models/Course')
const checkObjectId = require('../middleware/checkObjectId')
const Feedback = require('../models/Feedback')

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

module.exports = router
