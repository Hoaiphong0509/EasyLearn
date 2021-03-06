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

import Interweave from 'interweave'
import { useHistory } from 'react-router-dom'
import s from './styles.module.scss'

import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CommentIcon from '@mui/icons-material/Comment'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SettingsIcon from '@mui/icons-material/Settings'

import PropTypes from 'prop-types'

import CommentForm from 'components/Comments/CommentForm'
import CommentItem from 'components/Comments/CommentItem'
import { ROLES } from 'constants/AppConstants'
import { connect } from 'react-redux'
import {
  addComment,
  addLike,
  deleteBlog,
  deleteComment,
  removeLike
} from 'services/redux/actions/blog'
import { approveBlog, unApproveBlog } from 'services/redux/actions/moderator'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()

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
      title: t('modal.warnTitle'),
      text: t('modal.deleteBlg'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: t('btnYes'),
      cancelButtonText: t('btnCancle')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBlog(_id)
        history.replace('/my_stuff')
      }
    })
  }

  const handleUnapprovedBlog = async () => {
    Swal.fire({
      title: t('dialogModal.confirmIn4'),
      text: t('dialogModal.unApprovedBlg'),
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: t('btnYes'),
      cancelButtonText: t('btnCancle')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await unApproveBlog(_id)
      }
    })
  }

  const handleApprovedBlog = async () => {
    Swal.fire({
      title: t('dialogModal.confirmIn4'),
      text: t('dialogModal.approvedBlg'),
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#18e06f',
      cancelButtonColor: '#e63c49',
      confirmButtonText: t('btnYes'),
      cancelButtonText: t('btnCancle')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await approveBlog(_id)
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
            <HeartBrokenIcon color="default" sx={{ fontSize: '25px' }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              removeLike(_id)
              setIsLiked(false)
              setNumLikes(--likes.length)
            }}
          >
            <FavoriteIcon color="error" sx={{ fontSize: '25px' }} />
          </IconButton>
        )}
      </Badge>
      <Badge className={s.icon} badgeContent={comments.length} color="success">
        <IconButton onClick={toggleDrawer('right', true)}>
          <CommentIcon color="primary" sx={{ fontSize: '25px' }} />
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
              <IconButton onClick={() => handleUnapprovedBlog()}>
                <CheckCircleIcon color="success" sx={{ fontSize: '25px' }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Unapproved">
              <IconButton onClick={() => handleApprovedBlog()}>
                <BlockIcon color="error" sx={{ fontSize: '25px' }} />
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
                  <CheckCircleIcon color="success" sx={{ fontSize: '25px' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Unapproved">
                <IconButton>
                  <BlockIcon color="error" sx={{ fontSize: '25px' }} />
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
              <SettingsIcon sx={{ fontSize: '25px' }} />
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
    <>
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
    </>
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
