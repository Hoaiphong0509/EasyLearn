import React, { useEffect } from 'react'

import { getBlogs, getMyBlogs } from 'services/redux/actions/blog'
import { getCurrentProfile } from 'services/redux/actions/profile'
import { getMyLearnings, getMyCourses } from 'services/redux/actions/course'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyStuff from 'components/MyStuff'
import Spinner from 'react-spinkit'

const MyStuffPage = ({
  auth: {
    user,
    loading: { ld_us }
  },
  profile: {
    profile,
    loading: { ld_pr }
  },
  blog: {
    blogs,
    loading: { ld_bl }
  },
  course: {
    mylearnings,
    mycourses,
    loading: { ld_crs }
  },
  getMyBlogs,
  getMyLearnings,
  getMyCourses,
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile()
    getMyCourses()
    getMyLearnings()
    getMyBlogs()
  }, [])

  return ld_pr ||
    ld_us ||
    ld_bl ||
    ld_crs ||
    blogs === null ||
    user === null ||
    profile === null ||
    mylearnings === null ||
    mycourses === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <MyStuff
        user={user}
        profile={profile}
        blogs={blogs}
        learnings={mylearnings}
        courses={mycourses}
      />
    </React.Fragment>
  )
}

MyStuffPage.prototype = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  getMyBlogs: PropTypes.func.isRequired,
  getMyLearnings: PropTypes.func.isRequired,
  getMyCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  blog: state.blog,
  course: state.course
})

export default connect(mapStateToProps, {
  getMyBlogs,
  getMyLearnings,
  getMyCourses,
  getCurrentProfile
})(MyStuffPage)
