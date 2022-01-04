import React, { Fragment, useEffect } from 'react'
import {
  Grid,
  TextField,
  Stack,
  FormControl,
  FormControlLabel,
  Tooltip,
  Button,
  IconButton,
  Badge
} from '@mui/material'
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
import { Notifications } from '@mui/icons-material'
import AvatarBox from './AvatarBox'

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb'
  },
  {
    code: 'vi',
    name: 'Vietnam',
    country_code: 'vn'
  }
]

const Header = ({ auth: { isAuthenticated, user } }) => {
  const c = useStyles()
  const currentLanguageCode = cookies.get('i18next') || 'vi'
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

  const authLinks = (
    <Fragment>
      <IconButton aria-label="cart">
        <Badge className={c.badge} badgeContent={4}>
          <Notifications sx={{ fontSize: '36px' }} />
        </Badge>
      </IconButton>
      <AvatarBox user={user}/>
    </Fragment>
  )

  const guestLinks = (
    <Button variant="contained" className={s.button}>
      <Link to="/login">{t('header.login')}</Link>
    </Button>
  )

  return (
    <Grid
      className={classnames(s.root, c.root)}
      container
      spacing={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={2} className={s.logo}>
        <img className={s.image} src="/logo.png" alt="logo" />
      </Grid>
      <Grid item xs={8}>
        <TextField placeholder={t('header.search')} className={s.textField} />
      </Grid>
      <Grid item xs={2}>
        <Stack direction="row" spacing={2}>
          <FormControl>
            <Tooltip title={currentLanguage.name} placement="top">
              <FormControlLabel
                label=""
                control={<LanguageSwitch sx={{ m: 1 }} defaultChecked />}
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Header)
