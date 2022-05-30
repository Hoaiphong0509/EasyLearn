import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Box, Divider, Typography } from '@mui/material'
import { ChartBar as ChartBarIcon } from 'assets/icons/chart-bar'
import { Users as UsersIcon } from 'assets/icons/users'
import Class from '@mui/icons-material/Class'
import Create from '@mui/icons-material/Create'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ImageIcon from '@mui/icons-material/Image'
import NavItem from 'components/Admin/common/NavItem'
import s from './styles.module.scss'

const items = [
  {
    href: '/admin',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Dashboard'
  },
  {
    href: '/admin/users',
    icon: <UsersIcon fontSize="small" />,
    title: 'Users'
  },
  {
    href: '/admin/blogs',
    icon: <Create fontSize="small" />,
    title: 'Blogs'
  },
  {
    href: '/admin/courses',
    icon: <Class fontSize="small" />,
    title: 'Courses'
  },
  {
    href: '/admin/moderator',
    icon: <AdminPanelSettingsIcon fontSize="small" />,
    title: 'Moderator'
  },
  {
    href: '/admin/feedback',
    icon: <FeedbackIcon fontSize="small" />,
    title: 'Feedback'
  },
  {
    href: '/admin/banner',
    icon: <ImageIcon fontSize="small" />,
    title: 'Banner'
  }
]

const Nav = ({ auth: { user } }) => {
  return (
    <Box
      className={s.root}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto'
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <Link to="/admin">
            <img src="/logoSymbol.png" />
          </Link>
        </Box>
        <Box sx={{ px: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              borderRadius: 1
            }}
          >
            <div>
              <Typography color="var(--smooth-blue)" variant="subtitle1">
                EASY LEARN ADMIN
              </Typography>
              {user && (
                <Typography color="#ccc" variant="body2">
                  {user.name}
                </Typography>
              )}
            </div>
          </Box>
        </Box>
      </div>
      <Divider
        sx={{
          borderColor: '#2D3748',
          my: 3
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
      </Box>
    </Box>
  )
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Nav)
