const express = require('express')
const role = require('../helper/role')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')

// @route    POST api/admin/add_moderator
// @desc     Add email admin
// @access   Private
router.post('/add_moderator', authorize(role.Admin), async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ msg: 'Email is not exist in EasyLearn!' })
    if (user.roles.includes(role.Moderator))
      return res.status(400).json({ msg: 'This email is already Moderator!' })

    user.roles.push(role.Moderator)
    await user.save()
    return res.send(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/admin
// @desc     Change Banner
// @access   Private

// @route    GET api/admin
// @desc     Banned account [optional]
// @access   Private

module.exports = router
