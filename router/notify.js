const express = require('express')
const authorize = require('../middleware/authorize')
const checkObjectId = require('../middleware/checkObjectId')
const Notify = require('../models/Notify')

const router = express.Router()

// @route  GET api/notify
// @desc   GET my notifies
// @access Private
router.get('/', authorize(), async (req, res) => {
  try {
    const result = []
    const notifies = await Notify.find()
    notifies.forEach((n) => {
      n.recipient.forEach((s) => {
        if (s.user._id.toString() === req.user.id) {
          result.push(n)
        }
      })
    })

    res.json(result)
  } catch (err) {
    

    res.status(500).send('Server Error')
  }
})

// @route  PUT api/notify/:id
// @desc   PUT mark as read notify
// @access Private
router.put('/:id', authorize(), checkObjectId('id'), async (req, res) => {
  try {
    const result = []
    const notify = await Notify.findById(req.params.id)

    if (!notify) {
      return res.status(404).json({ msg: 'Notify not found' })
    }

    notifies.forEach((n) => {
      n.recipient.forEach((s) => {
        if (s.user._id.toString() === req.user.id) {
          result.push(n)
        }
      })
    })

    res.json(result)
  } catch (err) {
    

    res.status(500).send('Server Error')
  }
})

// @route  GET api/notify
// @desc   PUT mark as read all notifies
// @access Private
router.put('/', (req, res) => res.send('creator route'))

// @route  DELETE api/notify
// @desc   DELETE my notify
// @access Private
router.delete('/:id', authorize(), checkObjectId('id'), async (req, res) => {
  try {
    const notify = await Notify.findById(req.params.id)

    if (!notify) {
      return res.status(404).json({ msg: 'Notify not found' })
    }

    notify.recipient = notify.recipient.filter(
      ({ user }) => user.toString() !== req.user.id
    )

    if (notify.recipient.length === 0) await notify.remove()
    else await notify.save()

    res.json({ msg: 'Delete notify successfully' })
  } catch (err) {
    

    res.status(500).send('Server Error')
  }
})

// @route  GET api/notify
// @desc   DELETE all notifies
// @access Private
router.delete('/', (req, res) => res.send('creator route'))

module.exports = router
