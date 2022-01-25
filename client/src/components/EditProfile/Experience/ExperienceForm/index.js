import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material'
import React from 'react'

import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from 'services/redux/actions/profile'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import MobileDatePicker from '@mui/lab/MobileDatePicker'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { subDays } from 'date-fns'

const ExperienceForm = ({ addExperience }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: new Date('1975-01-01'),
    to: new Date(),
    current: false,
    description: ''
  })

  const { company, title, location, from, to, current, description } = formData

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <React.Fragment>
      <form className={s.form} onSubmit={handleSubmit}>
        <Stack spacing={2} className={s.stack}>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.experience.titleExp')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.experience.titleExp')}
              name="title"
              value={title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.experience.company')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.experience.company')}
              name="company"
              value={company}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.experience.location')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.experience.location')}
              name="location"
              value={location}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <DesktopDatePicker
              label={t('editProfile.experience.from')}
              name="from"
              value={from}
              maxDate={subDays(new Date(), 1)}
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  from: moment(newValue).format('L')
                })
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <FormControlLabel
              control={
                <Checkbox
                  name="current"
                  checked={current}
                  value={current}
                  onChange={() => {
                    setFormData({ ...formData, current: !current })
                  }}
                />
              }
              label={t('editProfile.experience.current')}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <DesktopDatePicker
              label={t('editProfile.experience.to')}
              name="to"
              value={to}
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  to: moment(newValue).format('L')
                })
              }}
              // minDate={moment(from).format('l')}
              maxDate={new Date()}
              disabled={current}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.experience.descExp')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.experience.descExp')}
              name="description"
              value={description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Button type="submit">{t('save')}</Button>
          </FormControl>
        </Stack>
      </form>
    </React.Fragment>
  )
}

ExperienceForm.prototype = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(ExperienceForm)
