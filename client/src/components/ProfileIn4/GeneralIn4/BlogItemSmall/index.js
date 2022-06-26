import { Badge, Box, Tooltip, Typography } from '@mui/material'
import React from 'react'

import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { cleanUpBlog } from 'services/redux/actions/blog'

import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'

const BlogItemSmall = ({ cleanUpBlog, blog }) => {
  const { _id, title, likes, comments } = blog

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.container}>
          <Link
            className={s.link}
            to={`/blogs/blog_detail/${_id}`}
            onClick={cleanUpBlog}
          >
            <div className={s.content}>
              <Tooltip title={title} placement="top-start" arrow>
                <Typography className={s.title} variant="p">
                  {title}
                </Typography>
              </Tooltip>
            </div>
          </Link>
          <div className={s.footer}>
            <Badge
              className={s.icon}
              badgeContent={likes.length}
              color="primary"
            >
              <FavoriteIcon color="error" sx={{ fontSize: 26 }} />
            </Badge>
            <Badge
              className={s.icon}
              badgeContent={comments.length}
              color="primary"
            >
              <CommentIcon color="error" sx={{ fontSize: 26 }} />
            </Badge>
          </div>
        </Box>
      </Box>
    </React.Fragment>
  )
}

BlogItemSmall.prototype = {
  cleanUpBlog: PropTypes.func.isRequired
}

export default connect(null, { cleanUpBlog })(BlogItemSmall)
