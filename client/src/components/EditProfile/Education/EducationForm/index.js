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
import { addEducation } from 'services/redux/actions/profile'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { subDays } from 'date-fns'

const EducationForm = ({ addEducation, handleSetLoading }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: new Date('1975-01-01'),
    to: new Date(),
    current: false,
    description: ''
  })

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    handleSetLoading(true)
    e.preventDefault()
    await addEducation(formData, history)
    handleSetLoading(false)
  }

  return (
    <React.Fragment>
      <form className={s.form} onSubmit={handleSubmit}>
        <Stack spacing={2} className={s.stack}>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.education.school')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.education.school')}
              name="school"
              value={school}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.education.degree')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.education.degree')}
              name="degree"
              value={degree}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.education.fieldofstudy')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.education.fieldofstudy')}
              name="fieldofstudy"
              value={fieldofstudy}
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
              disabled={current}
              maxDate={new Date()}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              label={t('editProfile.education.descEdu')}
              className={s.textField}
              type="text"
              placeholder={t('editProfile.education.descEdu')}
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

EducationForm.prototype = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(EducationForm)
