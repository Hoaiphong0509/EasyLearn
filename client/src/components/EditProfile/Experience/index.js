import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import ExperienceForm from './ExperienceForm'
import ExperienceItem from './ExperienceItem'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'

const Experience = ({ profile }) => {
  const { t } = useTranslation()
  const { experience } = profile

  useEffect(() => {}, [profile])

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.listExp}>
          {experience && experience.length === 0 ? (
            <Typography variant="h4">
              {t('editProfile.experience.notHaveExp')}
            </Typography>
          ) : (
            <List>
              {experience &&
                experience.map((exp) => (
                  <ExperienceItem experience={exp} key={exp._id} />
                ))}
            </List>
          )}
        </Box>
        <Box className={s.formExp}>
          <ExperienceForm />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Experience
