import React, { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import s from './styles.module.scss'
import { isPhoneNumber, isRequired } from 'utils/AppUltils'
import { registerCreator } from 'services/redux/actions/auth'
import { connect } from 'react-redux'
import { ROLES } from 'constants/AppConstants'
import { Redirect } from 'react-router-dom'

const RegisterCreator = ({ registerCreator, auth: { user } }) => {
  const [isValidSkills, setIsValidSkills] = useState(true)
  const [isValidPhone, setIsValidPhone] = useState(true)

  const [labelSkills, setLabelSkills] = useState('')
  const [labelPhone, setLabelPhone] = useState('')

  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    skills: '',
    location: '',
    phone: '',
    bio: ''
  })

  const { skills, location, phone, bio } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onBlur = (e) => {
    const value = e.target.value

    if (!isRequired(value)) {
      switch (e.target.name) {
        case 'skills':
          setIsValidSkills(false)
          break
        case 'phone':
          setIsValidPhone(false)
          break
        default:
          break
      }
    } else {
      switch (e.target.name) {
        case 'phone':
          if (!isPhoneNumber(value)) {
            setLabelPhone(t('editProfile.creator.invalidPhone'))
            setIsValidPhone(false)
          }
          break
        default:
          break
      }
    }
  }

  const onFocus = (e) => {
    switch (e.target.name) {
      case 'skills':
        setIsValidSkills(true)
        setLabelSkills('')
        break
      case 'phone':
        setIsValidPhone(true)
        setLabelPhone('')
        break
      default:
        break
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    registerCreator(formData, t)
  }

  return (
    <React.Fragment>
      <section className={s.root}>
        <div className={s.benefit}>
          <Typography variant="h4" className={s.title}>
            {t('editProfile.creator.benefits')}
          </Typography>
          <ul className={s.listBen}>
            <li>{t('editProfile.creator.ben1')}</li>
            <li>{t('editProfile.creator.ben2')}</li>
            <li>{t('editProfile.creator.ben3')}</li>
            <li>{t('editProfile.creator.ben4')}</li>
          </ul>
        </div>
        <form className={s.formControl} onSubmit={onSubmit}>
          <TextField
            error={!isValidSkills}
            required={!isValidSkills}
            className={s.textField}
            name="skills"
            value={skills}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder="EX html, css, java, c#"
            label={t('editProfile.creator.skills')}
          />
          <TextField
            error={!isValidPhone}
            required={!isValidPhone}
            className={s.textField}
            name="phone"
            value={phone}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder="EX: 0123 456 789"
            label={labelPhone ? labelPhone : t('editProfile.creator.phone')}
          />
          <TextField
            className={s.textField}
            name="location"
            value={location}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            label={t('editProfile.creator.location')}
            placeholder="EX: TP Hồ Chí Minh"
          />
          <TextField
            className={s.textField}
            name="bio"
            value={bio}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            label={t('editProfile.creator.bio')}
            placeholder="EX: I am a good creator"
          />
          <Button
            disabled={!(isValidSkills && isValidPhone)}
            type="submit"
            className={s.btnGetInTouch}
            variant="contained"
          >
            {t('editProfile.creator.getInTouch')}
          </Button>
        </form>
      </section>
    </React.Fragment>
  )
}

RegisterCreator.prototype = {
  registerCreator: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { registerCreator })(RegisterCreator)
