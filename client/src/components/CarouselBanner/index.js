import { Box, Button, Typography } from '@mui/material'
import Banner from 'components/Banner'
import React from 'react'

import s from './styles.module.scss'
import cn from 'classnames'
import useStyles from './useStyles'

import logoZoo from 'assets/img/Zoologo.png'
import facebook from 'assets/img/fb.png'
import youtube from 'assets/img/youtube.png'

import { useTranslation } from 'react-i18next'

const CarouselBanner = () => {
  const c = useStyles()
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <div id="slider">
        <input type="radio" name="slider" id="slide1" defaultChecked />
        <input type="radio" name="slider" id="slide2" />
        <input type="radio" name="slider" id="slide3" />
        <input type="radio" name="slider" id="slide4" />
        <div id="slides">
          <div id="overflow">
            <div className="inner">
              <div className="slide slide_1">
                <Box className={cn(s.root, c.root, s.box1)}>
                  <div className={s.content}>
                    <Typography
                      variant="h2"
                      component="h2"
                      fontWeight="bold"
                      color="var(--white-1)"
                    >
                      {t('banner.discord.title')}
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      fontSize="20px"
                      color="var(--white-2)"
                    >
                      {t('banner.discord.desc')}
                    </Typography>
                    <Button>
                      <a target="_blank" href="https://discord.gg/2sS8Cy4SHD">
                        {t('banner.discord.join')}
                      </a>
                    </Button>
                  </div>
                  <div className={s.image}>
                    <img src={logoZoo} />
                  </div>
                </Box>
              </div>
              <div className="slide slide_2">
                <Box className={cn(s.root, c.root, s.box2)}>
                  <div className={s.content}>
                    <Typography
                      variant="h2"
                      component="h2"
                      fontWeight="bold"
                      color="var(--white-1)"
                    >
                      {t('banner.facebook.title')}
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      fontSize="20px"
                      color="var(--white-2)"
                    >
                      {t('banner.facebook.desc')}
                    </Typography>
                    <Button>
                      <a
                        target="_blank"
                        href="https://www.facebook.com/discordIT"
                      >
                        {t('banner.facebook.join')}
                      </a>
                    </Button>
                  </div>
                  <div className={s.image}>
                    <img src={facebook} />
                  </div>
                </Box>
              </div>
              <div className="slide slide_3">
                <Box className={cn(s.root, c.root, s.box3)}>
                  <div className={s.content}>
                    <Typography
                      variant="h2"
                      component="h2"
                      fontWeight="bold"
                      color="var(--white-1)"
                    >
                      {t('banner.youtube.title')}
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      fontSize="20px"
                      color="var(--white-2)"
                    >
                      {t('banner.youtube.desc')}
                    </Typography>
                    <Button>
                      <a
                        target="_blank"
                        href="https://www.youtube.com/channel/UCbvO4DT80D8J9GXmEsvvXDw"
                      >
                        {t('banner.youtube.sub')}
                      </a>
                    </Button>
                  </div>
                  <div className={s.image}>
                    <img src={youtube} />
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div id="controls">
          <label htmlFor="slide1" />
          <label htmlFor="slide2" />
          <label htmlFor="slide3" />
        </div>
        <div id="bullets">
          <label htmlFor="slide1" />
          <label htmlFor="slide2" />
          <label htmlFor="slide3" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default CarouselBanner
