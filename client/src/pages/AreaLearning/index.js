import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { getCourse } from 'services/redux/actions/course'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Study from 'components/Learnings/Study'
import NotFoundPage from 'pages/NotFoundPage'
import { ROLES } from 'constants/AppConstants'

const AreaLearning = ({
  auth: { user },
  getCourse,
  course: { course, loading },
  match
}) => {
  useEffect(() => {
    getCourse(match.params.id)
  }, [getCourse, match.params.id])

  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : course.status === 'approved' ||
    (user &&
      (user.roles.includes(ROLES.ADMIN) ||
        user.roles.includes(ROLES.MODERATOR) ||
        user._id === course.user)) ? (
    <Study course={course} />
  ) : (
    <NotFoundPage title="COURSE ĐÃ BỊ BAN" />
  )
}

AreaLearning.prototype = {
  getCourse: PropTypes.func.isRequired,
  auth: PropTypes.object,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth
})

export default connect(mapStateToProps, { getCourse })(AreaLearning)
