import React from 'react'
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
const EyeLink = (link) => {
  return (
    <Link key={link} to={link} style={{ display: 'flex' }}>
      <RemoveRedEyeIcon color="info" sx={{ width: '24px', height: '24px' }} />
    </Link>
  )
}

export default EyeLink
