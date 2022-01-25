import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'

import CheckIcon from '@mui/icons-material/Check'

import s from './styles.module.scss'

const Gains = ({ course }) => {
  const { gains } = course
  return (
    <React.Fragment>
      <Box className={s.root}>
        <List className={s.list}>
          {gains.map((gain, index) => (
            <ListItem key={index}>
              <ListItemIcon className={s.listItemIcon}>
                <CheckIcon color="success" />
              </ListItemIcon>
              <ListItemText className={s.listItemText}>
                <Typography className={s.gainText} variant="p">
                  {gain}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </React.Fragment>
  )
}

export default Gains
