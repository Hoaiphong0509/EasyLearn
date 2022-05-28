import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'

import { Bell as BellIcon } from 'assets/icons/bell'
import { UserCircle as UserCircleIcon } from 'assets/icons/user-circle'
import HomeIcon from '@mui/icons-material/Home';

import s from './styles.module.scss'
import NotifyBox from 'components/Header/NotifyBox'
import { Link } from 'react-router-dom'

const Header = ({ auth: { user } }) => {
  return (
    <Box className={s.root}>
      <Box className={s.admin}>
        <Link to="/">
          <Tooltip title="Easy Learn Homepage">
            <IconButton>
              <HomeIcon color="primary" sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Link>
        <NotifyBox />
        {user ? (
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src={user.avatar}
          />
        ) : (
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        )}
      </Box>
    </Box>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(Header)
