import { Box } from '@mui/material'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Nav from 'components/Nav'
import s from './styles.module.scss'

const EditProfileLayout = (props) => {

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

export default EditProfileLayout
