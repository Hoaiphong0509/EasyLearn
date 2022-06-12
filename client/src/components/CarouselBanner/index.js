import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import logoZoo from 'assets/img/Zoologo.png'
import facebook from 'assets/img/fb.png'
import youtube from 'assets/img/youtube.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import 'swiper/css/bundle'
import 'swiper/css'
import 'swiper/css/autoplay'
import { useTranslation } from 'react-i18next'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBannersActive } from 'services/redux/actions/user'
import BannerItem from './BannerItem'

const initialBanner = [
  {
    titleVi: 'Easy Learn trong Discord',
    titleEn: 'Easy Learn in Discord',
    descVi:
      'Tham gia vào server discord Lonely Zoo để cùng nhau học & tập giải trí. Đồng thời kết bạn mới và giao lưu, trao đổi với nhau',
    descEn:
      'Join the Lonely Zoo discord server to learn & have fun together. Besides, make new friends and exchange, exchange with each other',
    link: 'https://discord.gg/2sS8Cy4SHD',
    color1: 'var(--dark-blue)',
    color2: ' var(--black-0)',
    img: logoZoo
  },
  {
    titleVi: 'Easy Learn tại Facebook',
    titleEn: 'Easy Learn on Facebook',
    descVi:
      'Theo dõi trang facebook của EasyLearn & Lonely Zoo để biết thêm những thông tin thú vị về học tập & giải trí',
    descEn:
      "Follow EasyLearn & Lonely Zoo's facebook page for more interesting information about learning & entertainment",
    link: 'https://www.facebook.com/discordIT',
    color1: '#369acd',
    color2: '#07efeb',
    img: facebook
  },
  {
    titleVi: 'Easy Learn trên Youtube',
    titleEn: 'Easy Learn with Youtube',
    descVi:
      'Đăng ký kênh Youtube của Easy Learn để theo dõi các khóa học được đăng tải trên đó',
    descEn:
      "Subscribe to Easy Learn's Youtube channel to follow the courses posted on it",
    link: 'https://www.youtube.com/channel/UCbvO4DT80D8J9GXmEsvvXDw',
    color1: '#eb4960',
    color2: '#f4837d',
    img: youtube
  }
]

const CarouselBanner = ({ banner: { banners }, getBannersActive }) => {
  useEffect(() => {
    getBannersActive()
  }, [getBannersActive])
  const { t } = useTranslation()

  const carrouselBanner = banners
    ? banners.length > 0
      ? banners.length >= 3
        ? banners
        : banners.concat(initialBanner)
      : initialBanner
    : initialBanner

  return (
    <React.Fragment>
      <Box>
        <Swiper
          autoplay={{
            delay: 5000
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          style={{ borderRadius: '20px', marginTop: ' 20px' }}
          className="mySwiper"
        >
          {carrouselBanner.map((bn, index) => (
            <SwiperSlide key={index}>
              <BannerItem banner={bn} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </React.Fragment>
  )
}

CarouselBanner.prototype = {
  getBannersActive: PropTypes.func.isRequired,
  banner: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  banner: state.banner
})

export default connect(mapStateToProps, { getBannersActive })(CarouselBanner)
