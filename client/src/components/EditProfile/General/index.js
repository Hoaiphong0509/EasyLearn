import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import TextField from '@mui/material/TextField'

import s from './styles.module.scss'
import useStyles from './useStyles'
import cn from 'classnames'

import { useTranslation } from 'react-i18next'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ROLES } from 'constants/AppConstants'
import { editProfile } from 'services/redux/actions/profile'

const initialState = {
  phone: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
}

const General = ({ user, profile, editProfile }) => {
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (profile) {
      const profileData = { ...initialState }
      for (const key in profile.profile) {
        if (key in profileData) profileData[key] = profile.profile[key]
      }
      for (const key in profile.profile.social) {
        if (key in profileData) profileData[key] = profile.profile.social[key]
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ')
      setFormData(profileData)
    }
  }, [profile])

  const {
    phone,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData

  const { t } = useTranslation()

  const c = useStyles()

  const handeleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const FormCreator = () => {
    if (profile)
      return (
        <>
          <FormControl className={s.formControl}>
            <Chip label={t('editProfile.creator.phone')} className={s.chip} />
            <TextField
              className={s.textField}
              name="phone"
              value={phone}
              placeholder="EX: +84123456789, 0123456789"
              onChange={handeleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Chip label={t('editProfile.creator.skills')} className={s.chip} />
            <TextField
              className={s.textField}
              name="skills"
              value={skills}
              placeholder="html, css, javascript"
              onChange={handeleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Chip label={t('editProfile.creator.bio')} className={s.chip} />
            <TextField
              className={s.textField}
              name="bio"
              value={bio}
              placeholder="Something about you"
              onChange={handeleChange}
            />
          </FormControl>
          <Divider sx={{ marginBottom: '20px' }} />
        </>
      )

    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    editProfile(formData)
  }

  return (
    <React.Fragment>
      <section className={cn(s.root, c.root)}>
        {user && (
          <form className={s.form} onSubmit={handleSubmit}>
            {user.roles.includes(ROLES.CREATOR) ? <FormCreator /> : null}

            {profile && (
              <>
                <FormControl className={s.formControl}>
                  <Chip label="Youtube" className={s.chip} />
                  <TextField
                    className={s.textField}
                    name="youtube"
                    value={youtube}
                    placeholder="https://www.youtube.com/channel"
                    onChange={handeleChange}
                  />
                </FormControl>
                <FormControl className={s.formControl}>
                  <Chip label="Facebook" className={s.chip} />
                  <TextField
                    className={s.textField}
                    name="facebook"
                    value={facebook}
                    placeholder="https://www.facebook.com"
                    onChange={handeleChange}
                  />
                </FormControl>
                <FormControl className={s.formControl}>
                  <Chip label="Twitter" className={s.chip} />
                  <TextField
                    className={s.textField}
                    name="twitter"
                    value={twitter}
                    placeholder="https://twitter.com/"
                    onChange={handeleChange}
                  />
                </FormControl>
                <FormControl className={s.formControl}>
                  <Chip label="Linkedin" className={s.chip} />
                  <TextField
                    className={s.textField}
                    name="linkedin"
                    value={linkedin}
                    placeholder="https://www.linkedin.com/in"
                    onChange={handeleChange}
                  />
                </FormControl>
                <FormControl className={s.formControl}>
                  <Chip label="Instagram" className={s.chip} />
                  <TextField
                    className={s.textField}
                    name="instagram"
                    value={instagram}
                    placeholder="https://www.instagram.com/"
                    onChange={handeleChange}
                  />
                </FormControl>
              </>
            )}

            <Button className={s.btnSubmit} type="submit">
              Save
            </Button>
          </form>
        )}
      </section>
    </React.Fragment>
  )
}

General.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { editProfile })(General)
