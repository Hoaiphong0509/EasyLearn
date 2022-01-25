import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle'

import s from './styles.module.scss'

const Requireds = ({ course }) => {
  const { requires } = course
  return (
    <React.Fragment>
      <Box className={s.root}>
        <List className={s.list}>
          {requires.map((require, index) => (
            <ListItem key={index}>
              <ListItemIcon className={s.listItemIcon}>
                <CircleIcon color="error" />
              </ListItemIcon>
              <ListItemText className={s.listItemText}>
                <Typography className={s.gainText} variant="p">
                  {require}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </React.Fragment>
  )
}

export default Requireds
