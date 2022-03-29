const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const authorize = require('../middleware/authorize')
const role = require('../helper/role')

const Blog = require('../models/Blog')
const User = require('../models/User')
const checkObjectId = require('../middleware/checkObjectId')

// @route    POST api/blog
// @desc     Create a blog
// @access   Private
router.post(
  '/',
  authorize(),
  check('title', 'Title is required').notEmpty(),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newBlog = new Blog({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      })

      await User.findOneAndUpdate(
        { user: req.user.id },
        { $push: { blogs: { blog: newBlog._id } } }
      )

      const blog = await newBlog.save()

      res.json(blog)
    } catch (err) {
       console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route  POST api/blog/add_img_blog/:id
// @desc   Add image for blog
// @access Private
// router.post(
//   '/add_img_blog/:id',
//   authorize(),
//   checkObjectId('id'),
//   multerSingle.single('img'),
//   async (req, res) => {
//     const { buffer } = req.file
//     try {
//       const { secure_url } = await bufferUpload(
//         buffer,
//         CLOUDINARY_PATH_BLOG,
//         'avatar',
//         848,
//         420
//       )

//       const result = await Blog.findByIdAndUpdate(req.params.id, {
//         $set: { img: secure_url },
//       })

//       return res.send(result)
//     } catch (error) {
//       console.log('error:', error.message)
//       res.send('Something went wrong please try again later..')
//     }
//   }
// )

// @route    PUT api/blog/:id
// @desc     Edit a blog
// @access   Private
// @TODO

// @route    GET api/blog
// @desc     Get all blogs
// @access   Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 })
    res.json(blogs)
  } catch (err) {
     console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/blog/my_blogs
// @desc     Get all my blogs
// @access   Private
router.get('/my_blogs', authorize(), async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 })
    const result = blogs.filter((b) => b.user._id.toString() === req.user.id)
    res.send(result)
  } catch (err) {
     console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/blog/get_blogs/:user_id
// @desc     Get all blogs by user Id
// @access   PUBLIC
router.get(
  '/get_blogs/:user_id',
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ date: -1 })
      const result = blogs.filter(
        (b) => b.user._id.toString() === req.params.user_id
      )
      res.send(result)
    } catch (err) {
       console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/blog/:id
// @desc     Get blog by ID
// @access   Public
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' })
    }

    res.json(blog)
  } catch (err) {
     console.log(err.message)

    res.status(500).send('Server Error')
  }
})

// @route    DELETE api/blog/:id
// @desc     Delete a blog
// @access   Private
router.delete('/:id', authorize(), checkObjectId('id'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(req.user.id)

    console.log(user.blogs)

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' })
    }

    // Check user
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    user.blogs = user.blogs.filter(
      ({ blog }) => blog.toString() !== req.params.id
    )

    await user.save()
    await blog.remove()

    res.json(user.blogs)
  } catch (err) {
     console.log(err.message)

    res.status(500).send('Server Error')
  }
})

// @route    PUT api/blog/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', authorize(), checkObjectId('id'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (blog.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Blog already liked' })
    }

    blog.likes.unshift({ user: req.user.id })

    await blog.save()

    return res.json(blog.likes)
  } catch (err) {
     console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/blog/unlike/:id
// @desc     Unlike a blog
// @access   Private
router.put(
  '/unlike/:id',
  authorize(),
  checkObjectId('id'),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)

      // Check if the post has not yet been liked
      if (!blog.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Blog has not yet been liked' })
      }

      // remove the like
      blog.likes = blog.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      )

      await blog.save()

      return res.json(blog.likes)
    } catch (err) {
       console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/blog/comment/:id
// @desc     Comment on a blog
// @access   Private
router.post(
  '/comment/:id',
  authorize(),
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const blog = await Blog.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      }

      blog.comments.unshift(newComment)

      await blog.save()

      res.json(blog.comments)
    } catch (err) {
       console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/blog/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', authorize(), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    // Pull out comment
    const comment = blog.comments.find(
      (comment) => comment.id === req.params.comment_id
    )
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' })
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    blog.comments = blog.comments.filter(
      ({ id }) => id !== req.params.comment_id
    )

    await blog.save()

    return res.json(blog.comments)
  } catch (err) {
     console.log(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router
