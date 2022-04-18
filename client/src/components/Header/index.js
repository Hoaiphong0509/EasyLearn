import React, { Fragment, useEffect } from 'react'
import {
  Grid,
  Stack,
  FormControl,
  FormControlLabel,
  Tooltip,
  Badge,
  IconButton
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import s from './styles.module.scss'
import useStyles from './useStyles'
import LanguageSwitch from 'components/Header/LanguageSwitch'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AvatarBox from './AvatarBox'
import SearchBox from './SearchBox'
import NotifyBox from './NotifyBox'

import GoogleLogin from 'react-google-login'
import { ENV } from 'constants/AppConstants'

import { googleLogin } from 'services/redux/actions/auth'

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

const Header = ({ googleLogin, auth: { isAuthenticated, user } }) => {
  const c = useStyles()
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

  const responseGoogleAuth = async (authResult) => {
    try {
      await googleLogin(authResult.tokenId)
    } catch (e) {
      console.log(e)
    }
  }

  const authLinks = (
    <>
      <NotifyBox />
      <AvatarBox user={user} />
    </>
  )

  const guestLinks = (
    <>
      <GoogleLogin
        clientId={ENV.GOOGLE_CLIENT_ID}
        buttonText={t('auth.googleLogin')}
        redirectUri="postmessage"
        onSuccess={responseGoogleAuth}
        onFailure={responseGoogleAuth}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )

  return (
    <Grid
      className={classnames(s.root, c.root)}
      container
      spacing={5}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={2} className={s.logo}>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </Grid>
      <Grid item xs={8} sx={{ textAlign: 'center' }}>
        <SearchBox />
      </Grid>
      <Grid item xs={2}>
        <Stack direction="row" spacing={2}>
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
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </Stack>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  googleLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { googleLogin })(Header)
