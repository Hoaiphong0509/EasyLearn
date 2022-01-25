import { Grid, Typography } from '@mui/material'
import CourseItem from 'components/CourseList/CourseItem'
import React from 'react'
import { Link } from 'react-router-dom'

const MyLearnings = ({ learnings }) => {
  console.log(learnings)

  return learnings.length > 0 ? (
    <Grid container spacing={4}>
      {learnings &&
        learnings.map((learning) => (
          <Grid item md={4} key={learning.learning}>
            <Link to={`/learning/${learning.learning}`}>
              <CourseItem course={learning} />
            </Link>
          </Grid>
        ))}
    </Grid>
  ) : (
    <Typography
      sx={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}
      variant="h2"
    >
      Khoong co khoa hocj
    </Typography>
  )
}

export default MyLearnings
