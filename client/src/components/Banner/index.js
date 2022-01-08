import React from 'react'

import logoZoo from 'assets/img/Zoologo.png'
import { Box, Button, Typography } from '@mui/material'
import s from './styles.module.scss'
import cn from 'classnames'
import useStyles from './useStyles'
import { Link } from 'react-router-dom'

const Banner = () => {
  const c = useStyles()
  return (
    <Box className={cn(s.root, c.root)}>
      <div className={s.content}>
        <Typography
          variant="h2"
          component="h2"
          fontWeight="bold"
          color="var(--white-1)"
        >
          Easy Learn trong discord
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="20px"
          color="var(--white-2)"
        >
          Tham gia vào server discord để cùng nhau học & tập giải trí
        </Typography>
        <Button>
          <a target="_blank" href="https://discord.gg/2sS8Cy4SHD">
            Tham gia
          </a>
        </Button>
      </div>
      <div className={s.image}>
        <img src={logoZoo} />
      </div>
    </Box>
  )
}

export default Banner
