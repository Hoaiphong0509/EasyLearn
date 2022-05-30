import { Chip } from '@mui/material'
import React from 'react'

const ChipCell = (label, color) => {
  return <Chip key={label} label={label} color={color} />
}

export default ChipCell
