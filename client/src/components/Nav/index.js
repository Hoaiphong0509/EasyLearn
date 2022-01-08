import React, { Fragment } from 'react'
import {
  Box,
  Container,
  List,
  ListItemButton,
  ListItemIcon
} from '@mui/material'
import { Home, Class, Create } from '@mui/icons-material'
import useStyles from './useStyles'
import s from './styles.module.scss'
import cn from 'classnames'

const Nav = () => {
  const c = useStyles()

  return (
    <Fragment>
      <Container fixed className={cn(s.root, c.root)}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Home className={s.icon} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Class className={s.icon} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Create className={s.icon} />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Container>
    </Fragment>
  )
}

export default Nav
