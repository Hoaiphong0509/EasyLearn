import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

import s from './styles.module.scss'
import Interweave from 'interweave'

import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import SendIcon from '@mui/icons-material/Send'

import PropTypes from 'prop-types'

import {
  addLike,
  removeLike,
  addComment,
  deleteComment
} from 'services/redux/actions/blog'
import { connect } from 'react-redux'
import CommentForm from 'components/Comments/CommentForm'
import CommentItem from 'components/Comments/CommentItem'

const BlogIn4 = ({
  blog,
  addLike,
  removeLike,
  addComment,
  deleteComment,
  auth: { user }
}) => {
  const { _id, title, text, author, likes, comments } = blog

  const [state, setState] = useState({
    right: false
  })

  const [cmt, setCmt] = useState('')

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleComment = (e) => {
    e.preventDefault()
    // addComment(_id, { cmt })
    setCmt('')
  }

  const areaComment = (anchor) => (
    <Box sx={{ width: 969 }}>
      <CommentForm blogId={_id} user={user} />
      <Divider />
      <List className={s.cmtList}>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} blogId={_id} />
        ))}
      </List>
    </Box>
  )

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Container className={s.container}>
          <header className={s.header}>
            <Typography variant="h2" className={s.title}>
              {title}
            </Typography>
            <div className={s.in4Creator}>
              {author.avatar ? (
                <>
                  <Avatar
                    src={author.avatar}
                    sx={{ width: 128, height: 128 }}
                  ></Avatar>
                  <Typography className={s.nameCreator} variant="h4">
                    {author.name}
                  </Typography>
                </>
              ) : (
                <>
                  <Avatar sx={{ width: 128, height: 128 }}>
                    {author.name.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography className={s.nameCreator} variant="h4">
                    {author.name}
                  </Typography>
                </>
              )}
            </div>
          </header>
          <section className={s.content}>
            <Interweave content={text} />
          </section>
          <footer className={s.footer}>
            <Badge
              className={s.icon}
              badgeContent={likes.length}
              color="primary"
            >
              <IconButton onClick={() => addLike(_id)}>
                <FavoriteIcon color="error" sx={{ fontSize: 50 }} />
              </IconButton>
            </Badge>
            <Badge
              className={s.icon}
              badgeContent={comments.length}
              color="success"
            >
              <IconButton onClick={toggleDrawer('right', true)}>
                <CommentIcon color="primary" sx={{ fontSize: 50 }} />
              </IconButton>
            </Badge>
            <Drawer
              anchor="right"
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {areaComment('right')}
            </Drawer>
            <Badge className={s.icon} color="primary">
              <IconButton onClick={() => removeLike(_id)}>
                <HeartBrokenIcon color="default" sx={{ fontSize: 50 }} />
              </IconButton>
            </Badge>
          </footer>
        </Container>
      </Box>
    </React.Fragment>
  )
}

BlogIn4.prototype = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  deleteComment
})(BlogIn4)
