import { Box } from '@mui/material'
import Nav from 'components/Nav'
import React from 'react'
import s from './styles.module.scss'
import Header from 'components/Header'
import Footer from 'components/Footer'
import CarouselBanner from 'components/CarouselBanner'

const HomeLayout = (props) => {
  return (
    <Box>
      <Header />
      <div className={s.content}>
        <div className={s.nav}>
          <Nav />
        </div>

        <div className={s.child}>
          <Box className={s.banner}>
            <CarouselBanner />
          </Box>
          <Box className={s.body}>{props.children}</Box>
        </div>
      </div>
      <Footer />
    </Box>
  )
}

export default HomeLayout
