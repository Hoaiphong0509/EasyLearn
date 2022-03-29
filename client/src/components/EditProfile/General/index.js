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
import { editProfile } from 'services/redux/actions/profile'

const initialState = {
  knowAs: '',
  bio: '',
  skills: '',
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
    knowAs,
    bio,
    skills,
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

  const handleSubmit = (e) => {
    e.preventDefault()

    editProfile(formData)
  }

  return (
    <React.Fragment>
      <section className={cn(s.root, c.root)}>
        {user && (
          <form className={s.form} onSubmit={handleSubmit}>
            <FormControl className={s.formControl}>
              <Chip
                label={t('editProfile.general.knowAs')}
                className={s.chip}
              />
              <TextField
                className={s.textField}
                name="knowAs"
                value={knowAs}
                placeholder="EX: Nguyễn Hoài Phong"
                onChange={handeleChange}
              />
            </FormControl>
            <FormControl className={s.formControl}>
              <Chip label={t('editProfile.general.bio')} className={s.chip} />
              <TextField
                className={s.textField}
                name="bio"
                value={bio}
                placeholder="Something about you"
                onChange={handeleChange}
              />
            </FormControl>
            <FormControl className={s.formControl}>
              <Chip label={t('editProfile.general.skills')} className={s.chip} />
              <TextField
                className={s.textField}
                name="skills"
                value={skills}
                placeholder="Something about you"
                onChange={handeleChange}
              />
            </FormControl>
            <Divider sx={{ marginBottom: '20px' }} />

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
