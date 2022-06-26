import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Tooltip
} from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import HomeIcon from '@mui/icons-material/Home'

import AvatarBox from 'components/Header/AvatarBox'
import LanguageSwitch from 'components/Header/LanguageSwitch'
import NotifyBox from 'components/Header/NotifyBox'
import i18next from 'i18next'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import s from './styles.module.scss'

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'usa'
  },
  {
    code: 'vi',
    name: 'Vietnam',
    country_code: 'vn'
  }
]

const Header = ({ auth: { user } }) => {
  const currentLanguageCode =
    (cookies.get('i18next') && cookies.get('i18next')) || 'vi'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
  }, [currentLanguage, t])

  const switchLanguageHandle = (e) => {
    if (e.target.checked) {
      i18next.changeLanguage('vi')
    } else {
      i18next.changeLanguage('en')
    }
  }

  return (
    <Box className={s.root}>
      <Box className={s.admin}>
        <FormControl>
          <Tooltip title={currentLanguage.name} placement="top">
            <FormControlLabel
              label=""
              control={
                <LanguageSwitch
                  sx={{ m: 1 }}
                  // defaultChecked={currentLanguageCode === 'vi'}
                  value={
                    currentLanguageCode &&
                    (currentLanguageCode === 'vi' ? true : false)
                  }
                  checked={currentLanguageCode === 'vi'}
                />
              }
              onChange={switchLanguageHandle}
            />
          </Tooltip>
        </FormControl>
        <Link to="/">
          <Tooltip title="Easy Learn Homepage">
            <IconButton>
              <HomeIcon color="primary" sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Link>
        <NotifyBox />
        {user && <AvatarBox user={user} />}
      </Box>
    </Box>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(Header)
