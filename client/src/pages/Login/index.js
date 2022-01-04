import React, { useState } from 'react'
import { connect } from 'react-redux'
import TextField from '@mui/material/TextField'
import s from './styles.module.scss'
import useStyles from './useStyles'
import classnames from 'classnames'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import PropTypes from 'prop-types'

import logo from 'assets/img/logoSymbol.png'
import { Link, Redirect } from 'react-router-dom'

import { isRequired, isEmail } from 'utils/AppUltils'
import { login } from 'services/redux/actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)

  const [labelEmail, setLabelEmail] = useState('')
  const c = useStyles()
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onBlur = (e) => {
    const value = e.target.value

    if (!isRequired(value)) {
      switch (e.target.name) {
        case 'email':
          setIsValidEmail(false)
          break
        case 'password':
          setIsValidPassword(false)
          break
        default:
          break
      }
    } else if (e.target.name === 'email') {
      if (!isEmail(value)) {
        setLabelEmail(t('auth.msgErrInvalidEmail'))
        setIsValidEmail(false)
      }
    }
  }

  const onFocus = (e) => {
    switch (e.target.name) {
      case 'email':
        setIsValidEmail(true)
        setLabelEmail('')
        break
      case 'password':
        setIsValidPassword(true)
        break
      default:
        break
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    login({ email, password }, t)
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className={classnames(s.root, c.root)}>
      <div className={s.container}>
        <div className={s.slogan}>
          Easy Learn<span className={s.thumb}> | {t('auth.learnToKnow')}</span>
        </div>
        <img src={logo} alt="logo" className={s.logo} />
        <form className={s.formControl} onSubmit={onSubmit}>
          <TextField
            error={!isValidEmail}
            required={!isValidEmail}
            className={s.textField}
            name="email"
            value={email}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder="EX: example@gmail.com"
            label={labelEmail ? labelEmail : t('auth.email')}
          />
          <TextField
            error={!isValidPassword}
            required={!isValidPassword}
            className={s.textField}
            name="password"
            value={password}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            label={t('auth.password')}
            type="password"
          />
          <Button
            disabled={!(isValidEmail && isValidPassword)}
            type="submit"
            className={s.btnLogin}
            variant="contained"
          >
            {t('auth.login')}
          </Button>
        </form>
        <div className={s.footer}>
          <Link className={s.link} to="/">
            {t('auth.backToHome')}
          </Link>
          <Link className={s.link} to="/register">
            {t('auth.register')}
          </Link>
        </div>
      </div>
    </div>
  )
}

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
