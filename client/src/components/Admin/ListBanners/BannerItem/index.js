import { Box, Typography } from '@mui/material'
import React from 'react'
import s from './styles.module.scss'

const BannerItem = (props) => {
  const { banner } = props
  const { _id, titleVi, descVi, link, color1 = '#000', color2 = '#000', img } = banner
  return (
    <Box
      className={s.root}
      style={{
        backgroundImage: `linear-gradient(62deg, ${color1} 0%, ${color2} 100%)`
      }}
    >
      <div className={s.content}>
        <Typography
          variant="h2"
          component="h2"
          fontWeight="bold"
          color="var(--white-1)"
        >
          {titleVi}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="20px"
          color="var(--white-2)"
        >
          {descVi}
        </Typography>
        <a
          rel="noreferrer"
          target="_blank"
          href={link}
          className={s.btn}
          style={{ background: `darken(${color1}, 1.5%)` }}
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          Xem
        </a>
      </div>
      <div className={s.image}>
        <img src={img} alt={title} />
      </div>
    </Box>
  )
}

export default BannerItem
