import { Box } from '@mui/material'
import React from 'react'

import PropTypes from 'prop-types'

import logoZoo from 'assets/img/Zoologo.png'
import facebook from 'assets/img/fb.png'
import youtube from 'assets/img/youtube.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { Navigation } from 'swiper'
import { useTranslation } from 'react-i18next'
import BannerItem from './BannerItem'

const CarouselBanner = (props) => {
  const { t } = useTranslation()
  const initialBanner = [
    {
      title: t('banner.discord.title'),
      desc: t('banner.discord.desc'),
      link: 'https://discord.gg/2sS8Cy4SHD',
      color1: 'var(--dark-blue)',
      color2: ' var(--black-0)',
      img: logoZoo
    },
    {
      title: t('banner.facebook.title'),
      desc: t('banner.facebook.desc'),
      link: 'https://www.facebook.com/discordIT',
      color1: '#369acd',
      color2: '#07efeb',
      img: facebook
    },
    {
      title: t('banner.youtube.title'),
      desc: t('banner.youtube.desc'),
      link: 'https://www.youtube.com/channel/UCbvO4DT80D8J9GXmEsvvXDw',
      color1: '#eb4960',
      color2: '#f4837d',
      img: youtube
    }
  ]
  const { banners = initialBanner } = props
  return (
    <React.Fragment>
      <Box >
        <Swiper navigation={true} modules={[Navigation]} style={{borderRadius: '20px', marginTop:' 20px'}} className="mySwiper">
          {banners.map((bn, index) => (
            <SwiperSlide key={index}>
              <BannerItem banner={bn} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </React.Fragment>
  )
}

CarouselBanner.propTypes = {
  banners: PropTypes.array
}

export default CarouselBanner
