import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
const EyeATag = (link) => {
  return (
    <a key={link} target="_blank" href={link} style={{ display: 'flex' }}>
      <RemoveRedEyeIcon color="info" sx={{ width: '24px', height: '24px' }} />
    </a>
  )
}

export default EyeATag
