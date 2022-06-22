import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

import s from './styles.module.scss'

import { addLike, removeLike, cleanUpBlog } from 'services/redux/actions/blog'
import { cleanUpProfile } from 'services/redux/actions/profile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BLOG_IMG_DEFAULT } from 'constants/AppConstants'
import { scrollToTop } from 'utils/AppUltils'

const BlogItem = ({
  auth: { user },
  blog,
  addLike,
  removeLike,
  cleanUpBlog,
  cleanUpProfile
}) => {
  const { _id, user: userBlog, title, author, likes, img } = blog
  const [numLikes, setNumLikes] = useState(likes.length)
  const [isLiked, setIsLiked] = useState(
    likes?.some((l) => l?.user.toString() === user?._id)
  )
  const imgBlg = `url("${img && img.length > 0 ? img : BLOG_IMG_DEFAULT}")`

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Link
          to={`/blogs/blog_detail/${_id}`}
          onClick={() => {
            cleanUpBlog()
            scrollToTop()
          }}
        >
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
          <Link to={`/profile/${userBlog}`} onClick={()=> {
            cleanUpProfile()
            scrollToTop()
          }}>
            <div className={s.in4}>
              <Avatar src={author.avatar} alt={author.name} />
              <Typography className={s.creator} variant="p">
                {author.name}
              </Typography>
            </div>
          </Link>
          <div className={s.rate}>
            {!isLiked ? (
              <IconButton
                disabled={!user}
                onClick={() => {
                  addLike(_id)
                  setIsLiked(true)
                  setNumLikes(++likes.length)
                }}
              >
                <HeartBrokenIcon color="default" sx={{ fontSize: 50 }} />
              </IconButton>
            ) : (
              <IconButton
                disabled={!user}
                onClick={() => {
                  removeLike(_id)
                  setIsLiked(false)
                  setNumLikes(--likes.length)
                }}
              >
                <FavoriteIcon color="error" sx={{ fontSize: 50 }} />
              </IconButton>
            )}
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
  cleanUpProfile: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  cleanUpBlog,
  cleanUpProfile
})(BlogItem)
