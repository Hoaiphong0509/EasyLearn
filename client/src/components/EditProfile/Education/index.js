import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import EducationForm from './EducationForm'
import EducationItem from './EducationItem'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'

const Education = ({ profile }) => {
  const { education } = profile
  const { t } = useTranslation()

  useEffect(() => {}, [profile])

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.listExp}>
          {education && education.length === 0 ? (
            <Typography variant="h4">
              {t('editProfile.education.notHaveEdu')}
            </Typography>
          ) : (
            <List>
              {education.map((edu) => (
                <EducationItem education={edu} key={edu._id} />
              ))}
            </List>
          )}
        </Box>
        <Box className={s.formExp}>
          <EducationForm />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Education
