import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { getProfile } from 'services/redux/actions/profile'
import { getCoursesByUserId } from 'services/redux/actions/course'
import { getBlogsByUserId } from 'services/redux/actions/blog'

import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import ProfileIn4 from 'components/ProfileIn4'

const ProfilePage = ({
  getProfile,
  getCoursesByUserId,
  getBlogsByUserId,
  profile: { profile },
  course: { courses },
  blog: { blogs, loading },
  match
}) => {
  useEffect(() => {
    getProfile(match.params.id)
    getCoursesByUserId(match.params.id)
    getBlogsByUserId(match.params.id)
  }, [getProfile, getCoursesByUserId, getBlogsByUserId, match.params.id])

  return loading || profile === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <ProfileIn4
        profile={profile}
        courses={courses}
        blogs={blogs}
      />
    </React.Fragment>
  )
}

ProfilePage.prototype = {
  getProfile: PropTypes.func.isRequired,
  getCoursesByUserId: PropTypes.func.isRequired,
  getBlogsByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  course: state.course,
  blog: state.blog,
})

export default connect(mapStateToProps, {
  getProfile,
  getCoursesByUserId,
  getBlogsByUserId
})(ProfilePage)
