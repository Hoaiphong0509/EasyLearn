import { Box } from '@mui/material'
import Header from 'components/Admin/common/Header'
import Nav from 'components/Admin/common/Nav'
import Footer from 'components/Footer'
import s from './styles.module.scss'

const AdminLayout = (props) => {
  const { children } = props

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
