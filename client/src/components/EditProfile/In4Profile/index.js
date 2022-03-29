import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import s from './styles.module.scss'

const In4Profile = ({ user, profile }) => {
  return (
    <Box className={s.root}>
      <Avatar
        src={user.avatar}
        alt={profile.knowAs ? profile.knowAs : user.name}
        sx={{ width: 154, height: 154 }}
      />
      <Typography variant="h4" className={s.name}>
        {profile.knowAs ? profile.knowAs : user.name}
      </Typography>
    </Box>
  )
}

export default In4Profile
