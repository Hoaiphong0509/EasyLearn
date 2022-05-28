import React, { useEffect } from 'react'

import { Box, Container, Grid } from '@mui/material'
import CardStudent from 'components/Admin/Dashboard/CardStudent'
import CardCreator from 'components/Admin/Dashboard/CardCreator'
import CardCourse from 'components/Admin/Dashboard/CardCourse'
import CardBlog from 'components/Admin/Dashboard/CardBlog'
import Products from 'components/Admin/Dashboard/Products'
import ReportUpdate from 'components/Admin/Dashboard/ReportUpdate'
import Spinner from 'react-spinkit'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from 'services/redux/actions/user'
import { getCourses } from 'services/redux/actions/course'
import { getBlogs } from 'services/redux/actions/blog'

const Dashboard = ({
  getUsers,
  user: { users, loading: ldUs },
  getCourses,
  course: { courses, loading: ldCrs },
  getBlogs,
  blog: { blogs, loading: ldBls }
}) => {
  useEffect(async () => {
    getUsers()
  }, [getUsers])
  useEffect(async () => {
    getCourses()
  }, [getCourses])
  useEffect(async () => {
    getBlogs()
  }, [getBlogs])

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {ldUs || users === null ? (
            <Spinner name="cube-grid" color="aqua" />
          ) : (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardStudent users={users} />
            </Grid>
          )}
          {ldUs || users === null ? (
            <Spinner name="cube-grid" color="aqua" />
          ) : (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardCreator users={users} />
            </Grid>
          )}
          {ldCrs || courses === null ? (
            <Spinner name="cube-grid" color="aqua" />
          ) : (
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <CardCourse courses={courses} />
            </Grid>
          )}
          {ldBls || blogs === null ? (
            <Spinner name="cube-grid" color="aqua" />
          ) : (
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <CardBlog blogs={blogs}/>
            </Grid>
          )}
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Products sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <ReportUpdate />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

Dashboard.prototype = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  course: state.course,
  blog: state.blog
})

export default connect(mapStateToProps, { getUsers, getCourses, getBlogs })(
  Dashboard
)
