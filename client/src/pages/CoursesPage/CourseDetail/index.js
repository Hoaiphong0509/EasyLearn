import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getCourse } from 'services/redux/actions/course'
import Spinner from 'react-spinkit'
import CourseIn4 from 'components/CourseList/CourseIn4'
import NotFoundPage from 'pages/NotFoundPage'
import { ROLES } from 'constants/AppConstants'

const CourseDetail = ({
  auth: { user },
  getCourse,
  course: { course, loading },
  match
}) => {
  useEffect(() => {
    const fetchCourse = async () => await getCourse(match.params.id)
    fetchCourse()
  }, [getCourse, match.params.id])

  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : course.status === 'approved' ||
    (user &&
      (user.roles.includes(ROLES.ADMIN) ||
        user.roles.includes(ROLES.MODERATOR) ||
        user._id === course.user)) ? (
    <CourseIn4 course={course} />
  ) : (
    <NotFoundPage title="COURSE ĐÃ BỊ BAN" />
  )
}

CourseDetail.prototype = {
  course: PropTypes.object.isRequired,
  auth: PropTypes.object,
  profile: PropTypes.object.isRequired,
  getCourse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth
})

export default connect(mapStateToProps, { getCourse })(CourseDetail)
