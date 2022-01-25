import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

import s from './styles.module.scss'

const Overview = ({ course }) => {
  const { creator, avatar, title, punchLike, description } = course

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.header}>
          <Typography className={s.title} variant="h3">
            {title}
          </Typography>
          <Typography className={s.description} variant="p">
            {description}
          </Typography>
          <Typography className={s.punchLike} variant="p">
            {punchLike}
          </Typography>
        </Box>
        <Box className={s.in4creator}>
          <Avatar
            className={s.avt}
            src={avatar}
            sx={{ width: 80, height: 80 }}
          />
          <Typography className={s.creator} variant="h5">
            {creator}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Overview
