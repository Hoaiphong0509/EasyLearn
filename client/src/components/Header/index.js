import React, { useEffect, useState } from 'react'
import {
  Grid,
  Stack,
  FormControlLabel,
  Tooltip,
  IconButton,
  Box
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import GoogleLogin from 'react-google-login'
import { ENV, ROLES } from 'constants/AppConstants'

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
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      await googleLogin(authResult.tokenId)
      setLoading(false)
    } catch (e) {}
  }
  const authLinks = (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {user &&
      (user.roles.includes(ROLES.ADMIN) ||
        user.roles.includes(ROLES.MODERATOR)) ? (
        <Link to="/admin/dashboard">
          <Tooltip title="Admin Panel">
            <IconButton>
              <AdminPanelSettingsIcon color="warning" sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Link>
      ) : null}
      <NotifyBox />
      <AvatarBox user={user} />
    </Box>
  )

  const guestLinks = (
    <GoogleLogin
      className="btn_google_login"
      clientId={ENV.GOOGLE_CLIENT_ID}
      buttonText={t('auth.googleLogin')}
      redirectUri="postmessage"
      onSuccess={responseGoogleAuth}
      onFailure={responseGoogleAuth}
      cookiePolicy={'single_host_origin'}
    />
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
      <Grid item xs={1} className={s.logo}>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </Grid>
      <Grid item xs={7} sx={{ textAlign: 'center' }}>
        <SearchBox />
      </Grid>
      <Grid item xs={4}>
        <Stack direction="row" spacing={2} justifyContent='flex-end'>
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={currentLanguage.name} placement="top">
              <FormControlLabel
                label=""
                control={
                  <LanguageSwitch
                    sx={{ m: 1 }}
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
          </Box>
          {loading ? (
            <LoadingButton />
          ) : (
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {isAuthenticated ? authLinks : guestLinks}
            </Box>
          )}
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
