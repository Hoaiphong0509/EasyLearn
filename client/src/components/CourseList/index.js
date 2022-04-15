import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseItem from './CourseItem'

const CourseList = ({ courses, profile }) => {
  return (
    <Grid container spacing={4}>
      {courses &&
        courses.map((course) => (
          <Grid item md={4} key={course._id}>
            <CourseItem course={course} profile={profile} />
          </Grid>
        ))}
    </Grid>
  )
}

export default CourseList
