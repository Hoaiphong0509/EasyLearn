import { Class, Create, Home } from '@mui/icons-material'
import {
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip
} from '@mui/material'
import cn from 'classnames'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import s from './styles.module.scss'
import useStyles from './useStyles'

const Nav = () => {
  const c = useStyles()
  return (
    <Fragment>
      <Container fixed className={cn(s.root, c.root)}>
        <List>
          <Link to="/">
            <ListItemButton>
              <Tooltip title="Home" placement="right" arrow>
                <ListItemIcon>
                  <Home className={s.icon} />
                </ListItemIcon>
              </Tooltip>
            </ListItemButton>
          </Link>
          <Link to="/courses">
            <ListItemButton>
              <Tooltip title="Course" placement="right" arrow>
                <ListItemIcon>
                  <Class className={s.icon} />
                </ListItemIcon>
              </Tooltip>
            </ListItemButton>
          </Link>
          <Link to="/blogs">
            <ListItemButton>
              <Tooltip title="Blog" placement="right" arrow>
                <ListItemIcon>
                  <Create className={s.icon} />
                </ListItemIcon>
              </Tooltip>
            </ListItemButton>
          </Link>
        </List>
      </Container>
    </Fragment>
  )
}

export default Nav
