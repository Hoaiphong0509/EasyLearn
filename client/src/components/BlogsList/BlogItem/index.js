import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

import s from './styles.module.scss'

import { addLike, removeLike, cleanUpBlog } from 'services/redux/actions/blog'
import { cleanUpProfile } from 'services/redux/actions/profile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BLOG_IMG_DEFAULT } from 'constants/AppConstants'

const BlogItem = ({
  blog,
  addLike,
  removeLike,
  cleanUpBlog,
  cleanUpProfile
}) => {
  const { _id, user, title, author, likes, img } = blog

  const imgBlg = `url("${img && img.length > 0 ? img : BLOG_IMG_DEFAULT}")`

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Link to={`/blogs/blog_detail/${_id}`} onClick={cleanUpBlog}>
          <Box
            className={s.content}
            sx={{ background: `${img ? imgBlg : 'red'}` }}
          >
            <Tooltip title={title} placement="top-start" arrow>
              <Typography className={s.title} variant="h4">
                {title}
              </Typography>
            </Tooltip>
          </Box>
        </Link>
        <div className={s.footer}>
          <Link to={`/profile/${user}`} onClick={cleanUpProfile}>
            <div className={s.in4}>
              <Avatar src={author.avatar} alt={author.name} />
              <Typography className={s.creator} variant="p">
                {author.name}
              </Typography>
            </div>
          </Link>
          <div className={s.rate}>
            <IconButton
              onClick={() => removeLike(_id)}
              className={s.btnLike}
              color="default"
              component="span"
            >
              <HeartBrokenIcon />
            </IconButton>
            <IconButton
              onClick={() => addLike(_id)}
              className={s.btnLike}
              color="error"
              component="span"
            >
              <FavoriteIcon />
            </IconButton>
            <Typography className={s.numberLikes} variant="p">
              {likes && likes.length > 0 ? likes.length : '0'}
            </Typography>
          </div>
        </div>
      </Box>
    </React.Fragment>
  )
}

BlogItem.prototype = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  cleanUpBlog: PropTypes.func.isRequired,
  cleanUpProfile: PropTypes.func.isRequired
}

export default connect(null, {
  addLike,
  removeLike,
  cleanUpBlog,
  cleanUpProfile
})(BlogItem)
