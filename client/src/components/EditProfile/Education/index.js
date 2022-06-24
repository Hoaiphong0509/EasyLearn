import { Box, List, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import EducationForm from './EducationForm'
import EducationItem from './EducationItem'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'
import MyLoading from 'components/common/MyLoading'

const Education = ({ profile }) => {
  const { education } = profile
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const handleSetLoading = (isLoading) => setLoading(isLoading)
  useEffect(() => {}, [profile])

  if (loading) return <MyLoading />
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
              {education &&
                education.map((edu) => (
                  <EducationItem education={edu} key={edu._id} />
                ))}
            </List>
          )}
        </Box>
        <Box className={s.formExp}>
          <EducationForm handleSetLoading={handleSetLoading}/>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Education
