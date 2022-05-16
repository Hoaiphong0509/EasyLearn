import { Grid, Typography } from '@mui/material'

import CourseItem from 'components/CourseList/CourseItem'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MyCourses = ({ courses }) => {
  const { t } = useTranslation()
  return courses.length > 0 ? (
    <Grid container spacing={4}>
      {courses &&
        courses.map((course) => (
          <Grid item md={4} key={course._id}>
            <CourseItem course={course} />
          </Grid>
        ))}
    </Grid>
  ) : (
    <Typography
      sx={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}
      variant="h2"
    >
      {t('myStuff.noCourses')}
    </Typography>
  )
}

export default MyCourses
