import { Box } from '@mui/material'
import Nav from 'components/Nav'
import React from 'react'
import s from './styles.module.scss'
import Header from 'components/Header'
import Footer from 'components/Footer'

const DefaultLayout = (props) => {
  return (
    <Box>
      <Header />
      <div className={s.content}>
        <div className={s.nav}>
          <Nav />
        </div>
        <div className={s.child}>{props.children}</div>
      </div>
      <Footer />
    </Box>
  )
}

export default DefaultLayout
