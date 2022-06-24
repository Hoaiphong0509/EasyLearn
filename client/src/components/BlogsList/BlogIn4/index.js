import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import s from './styles.module.scss'
import Interweave from 'interweave'

import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BlockIcon from '@mui/icons-material/Block'

import PropTypes from 'prop-types'

import {
  addLike,
  removeLike,
  addComment,
  deleteComment,
  deleteBlog
} from 'services/redux/actions/blog'
import { approveBlog, unApproveBlog } from 'services/redux/actions/moderator'
import { connect } from 'react-redux'
import CommentForm from 'components/Comments/CommentForm'
import CommentItem from 'components/Comments/CommentItem'
import { ROLES } from 'constants/AppConstants'
import Swal from 'sweetalert2'
const BlogIn4 = ({
  auth: { user },
  blog,
  addLike,
  removeLike,
  deleteBlog,
  approveBlog,
  unApproveBlog
}) => {
  const history = useHistory()
  const {
    _id,
    title,
    text,
    author,
    likes,
    comments,
    status,
    user: userBlog
  } = blog

  const [numLikes, setNumLikes] = useState(likes.length)
  const [isLiked, setIsLiked] = useState(
    user !== null && likes?.some((l) => l?.user.toString() === user?._id)
  )

  useEffect(() => {
    if (likes.some((l) => l.user.toString() === user?._id)) setIsLiked(true)
  }, [user, likes])

  const [state, setState] = useState({
    right: false
  })

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleDeleteBlog = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#18e06f',
      cancelButtonColor: '#e63c49',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBlog(_id)
        history.replace('/my_stuff')
      }
    })
  }

  const areaComment = () => (
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

  const interaction = (
    <footer className={s.footer}>
      <Badge className={s.icon} badgeContent={numLikes} color="primary">
        {!isLiked ? (
          <IconButton
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
            onClick={() => {
              removeLike(_id)
              setIsLiked(false)
              setNumLikes(--likes.length)
            }}
          >
            <FavoriteIcon color="error" sx={{ fontSize: 50 }} />
          </IconButton>
        )}
      </Badge>
      <Badge className={s.icon} badgeContent={comments.length} color="success">
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
      {user &&
      (user.roles.includes(ROLES.ADMIN) ||
        user.roles.includes(ROLES.MODERATOR)) &&
      user._id !== userBlog ? (
        <Badge className={s.icon} color="primary">
          {status === 'approved' ? (
            <Tooltip title="Approved">
              <IconButton onClick={() => unApproveBlog(_id)}>
                <CheckCircleIcon color="success" sx={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Unapproved">
              <IconButton onClick={() => approveBlog(_id)}>
                <BlockIcon color="error" sx={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
          )}
        </Badge>
      ) : null}
      {user && user._id === userBlog ? (
        <>
          <Badge className={s.icon} color="primary">
            {status === 'approved' ? (
              <Tooltip title="Approved">
                <IconButton>
                  <CheckCircleIcon color="success" sx={{ fontSize: 50 }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Unapproved">
                <IconButton>
                  <BlockIcon color="error" sx={{ fontSize: 50 }} />
                </IconButton>
              </Tooltip>
            )}
          </Badge>
          <Badge className={s.icon} color="primary">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push(`/blogs/edit_blog/${_id}`)}>
                Edit
                <IconButton>
                  <ModeEditIcon color="default" sx={{ fontSize: 20 }} />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={handleDeleteBlog}>
                Delete
                <IconButton>
                  <DeleteForeverIcon color="default" sx={{ fontSize: 20 }} />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={() => history.push(`/blogs/add_img/${_id}`)}>
                Change image
                <IconButton>
                  <InsertPhotoIcon color="default" sx={{ fontSize: 20 }} />
                </IconButton>
              </MenuItem>
            </Menu>
          </Badge>
        </>
      ) : null}
    </footer>
  )

  return (
    <React.Fragment>
      <Box className={s.root}>
        {user && interaction}
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
        </Container>
      </Box>
    </React.Fragment>
  )
}

BlogIn4.prototype = {
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  approveBlog: PropTypes.func.isRequired,
  unApproveBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  deleteComment,
  deleteBlog,
  approveBlog,
  unApproveBlog
})(BlogIn4)
