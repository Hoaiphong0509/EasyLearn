import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Button, ListItem } from '@mui/material'

const NavItem = (props) => {
  const { href, icon, title, ...others } = props
  const location = useLocation()
  const active = href ? location.pathname.includes(href) : false

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Link to={href}>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? 'var(--smooth-blue)' : 'var(--white-1)',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'var(--smooth-blue)' : 'var(--white-1)'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </Link>
    </ListItem>
  )
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
}

export default NavItem
