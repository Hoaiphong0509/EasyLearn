import { Avatar } from '@mui/material'
import React from 'react'

const AvatarTableCell = (value) => {
  return <Avatar src={value} alt="avatar" sx={{ width: 32, height: 32, objectFit: 'coveer' }}  />
}

export default AvatarTableCell
