import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'

import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './useStyles'
import { useHistory } from 'react-router-dom'

import { logout } from 'services/redux/actions/auth'
import { ROLES } from 'constants/AppConstants'
import { cleanUpBlog } from 'services/redux/actions/blog'
import { cleanUpCourse } from 'services/redux/actions/course'

import s from './styles.module.scss'

const AvatarBox = ({ logout, user, cleanUpBlog, cleanUpCourse }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const history = useHistory()
  const open = Boolean(anchorEl)

  const c = useStyles()
  const { t } = useTranslation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    history.push('/edit-profile')
  }

  const handleCourse = () => {
    cleanUpCourse()
    history.push('/courses/create_course')
  }

  const handleCreateBlog = () => {
    cleanUpBlog()
    history.push('/blogs/create_blog')
  }

  const handleStuff = () => {
    history.push('/my_stuff')
  }

  return (
    <React.Fragment>
      <Box
        className={s.root}
        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
      >
        {user && (
          <Tooltip title={user.knowAs ? user.knowAs : user.name}>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              {user.avatar ? (
                <Avatar
                  src={user.avatar}
                  sx={{ width: 32, height: 32 }}
                ></Avatar>
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.name.slice(0, 1).toUpperCase()}
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0
        }}
        className={c.menu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>{t('header.profile')}</MenuItem>
        <MenuItem onClick={handleStuff}>{t('header.myStuff')}</MenuItem>
        <Divider />
        {user && user.roles.includes(ROLES.CREATOR) ? (
          <MenuItem onClick={handleCourse}>{t('header.createCourse')}</MenuItem>
        ) : null}
        <MenuItem onClick={handleCreateBlog}>{t('header.createBlog')}</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            history.replace('/')
            logout()
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('header.logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

AvatarBox.propTypes = {
  logout: PropTypes.func.isRequired,
  cleanUpBlog: PropTypes.func.isRequired,
  cleanUpCourse: PropTypes.func.isRequired
}

export default connect(null, { logout, cleanUpBlog, cleanUpCourse })(AvatarBox)
