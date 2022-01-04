import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import TextField from '@mui/material/TextField'
import s from '../Login/styles.module.scss'
import useStyles from '../Login/useStyles'
import classnames from 'classnames'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import PropTypes from 'prop-types'

import logo from 'assets/img/logoSymbol.png'
import { Link, Redirect } from 'react-router-dom'
import { register } from 'services/redux/actions/auth'
import { isRequired, isEmail, isPassword, isName } from 'utils/AppUltils'

const Register = ({ register, isAuthenticated }) => {
  const [isValidName, setIsValidName] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true)

  const [labelName, setLabelName] = useState('')
  const [labelEmail, setLabelEmail] = useState('')
  const [labelPassword, setLabelPassword] = useState('')
  const [labelConfirmPassword, setLabelConfirmPassword] = useState('')

  const c = useStyles()
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = formData

  const onChange = (e) => {
    if (e.target.name === 'confirmPassword')
      if (e.target.value !== password) setIsValidPassword(false)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onBlur = (e) => {
    const value = e.target.value

    if (!isRequired(value)) {
      switch (e.target.name) {
        case 'name':
          setIsValidName(false)
          break
        case 'email':
          setIsValidEmail(false)
          break
        case 'password':
          setIsValidPassword(false)
          break
        default:
          break
      }
    } else {
      switch (e.target.name) {
        case 'name':
          if (!isName(value)) {
            setLabelName(t('auth.invalidName'))
            setIsValidName(false)
          }
          break
        case 'email':
          if (!isEmail(value)) {
            setLabelEmail(t('auth.msgErrInvalidEmail'))
            setIsValidEmail(false)
          }
          break
        case 'password':
          if (!isPassword(value)) {
            setLabelPassword(t('auth.invalidPassword'))
            setIsValidPassword(false)
          }
          break
        case 'confirmPassword':
          if (password !== value) {
            setLabelConfirmPassword(t('auth.invalidConfirmPassword'))
            setIsValidConfirmPassword(false)
          }
          break
        default:
          break
      }
    }
  }

  const onFocus = (e) => {
    switch (e.target.name) {
      case 'name':
        setIsValidName(true)
        setLabelName('')
        break
      case 'email':
        setIsValidEmail(true)
        setLabelEmail('')
        break
      case 'password':
        setIsValidPassword(true)
        setLabelPassword('')
        break
      case 'confirmPassword':
        setIsValidConfirmPassword(true)
        setLabelConfirmPassword('')
        break
      default:
        break
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    register({ name, email, password }, t)
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
            error={!isValidName}
            required={!isValidName}
            className={s.textField}
            name="name"
            value={name}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={`${t('auth.msgInvalidName')} EX: FULL HP`}
            label={labelName ? labelName : t('auth.name')}
          />
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
            label={labelPassword ? labelPassword : t('auth.password')}
            placeholder={t('auth.msgErrPassword')}
            type="password"
          />
          <TextField
            error={!isValidConfirmPassword}
            required={!isValidConfirmPassword}
            className={s.textField}
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            label={
              labelConfirmPassword
                ? labelConfirmPassword
                : t('auth.confirmPassword')
            }
            type="password"
          />
          <Button
            disabled={
              !(
                isValidName &&
                isValidEmail &&
                isValidPassword &&
                isValidConfirmPassword
              )
            }
            type="submit"
            className={s.btnLogin}
            variant="contained"
          >
            {t('auth.register')}
          </Button>
        </form>
        <div className={s.footer}>
          <Link className={s.link} to="/">
            {t('auth.backToHome')}
          </Link>
          <Link className={s.link} to="/login">
            {t('auth.login')}
          </Link>
        </div>
      </div>
    </div>
  )
}

Register.prototype = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register)
