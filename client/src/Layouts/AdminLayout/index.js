import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import useStyles from './useStyles'
import s from './styles.module.scss'
import Header from 'components/Admin/common/Header'
import Nav from 'components/Admin/common/Nav'
import Footer from 'components/Footer'

const AdminLayout = (props) => {
  const { children } = props

  const c = useStyles()
  return (
    <Box className={s.root}>
      <Nav />
      <div className={s.content}>
        <div className={s.nav}>
          <Header />
        </div>
        <div className={s.child}>{children}</div>
        <Footer />
      </div>
    </Box>
  )
}

export default AdminLayout
