import { Grid, Typography } from '@mui/material'

import CourseItem from 'components/CourseList/CourseItem'
import React from 'react'

const MyCourses = ({ courses }) => {
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
      Khoong co khoa học
    </Typography>
  )
}

export default MyCourses
