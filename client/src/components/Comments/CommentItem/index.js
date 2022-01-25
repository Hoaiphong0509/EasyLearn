import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'
import moment from 'moment'

import PropsTypes from 'prop-types'
import { DeleteOutline } from '@mui/icons-material'
import { connect } from 'react-redux'

import { deleteComment } from 'services/redux/actions/blog'

import s from './styles.module.scss'

const CommentItem = ({
  blogId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  return (
    <Box className={s.root}>
      <section className={s.avt}>
        <Avatar src={avatar} sx={{ width: 48, height: 48 }} />
        <div className={s.in4}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h4">{text}</Typography>
        </div>
      </section>
      <section className={s.foot}>
        <Typography className={s.date} variant="p">
          {moment(date).format('MMM Do YY')}
        </Typography>
        {!auth.loading && user === auth.user._id && (
          <IconButton onClick={() => deleteComment(blogId, _id)}>
            <DeleteOutline color="error" />
          </IconButton>
        )}
      </section>
    </Box>
  )
}

CommentItem.prototype = {
  auth: PropsTypes.object.isRequired,
  deleteComment: PropsTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
