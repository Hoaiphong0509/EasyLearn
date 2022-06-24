import { Box, List, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ExperienceForm from './ExperienceForm'
import ExperienceItem from './ExperienceItem'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'
import MyLoading from 'components/common/MyLoading'

const Experience = ({ profile }) => {
  const { t } = useTranslation()
  const { experience } = profile

  const [loading, setLoading] = useState(false)

  const handleSetLoading = (isLoading) => setLoading(isLoading)
  useEffect(() => {}, [profile])

  if (loading) return <MyLoading />

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
          <ExperienceForm handleSetLoading={handleSetLoading} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Experience
