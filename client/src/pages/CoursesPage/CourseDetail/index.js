import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getCourse } from 'services/redux/actions/course'
import Spinner from 'react-spinkit'
import CourseIn4 from 'components/CourseList/CourseIn4'

const CourseDetail = ({ getCourse, course: { course, loading }, match }) => {
  useEffect(async () => {
    await getCourse(match.params.id)
  }, [getCourse, match.params.id])


  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <CourseIn4 course={course} />
    </React.Fragment>
  )
}

CourseDetail.prototype = {
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCourse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourse })(CourseDetail)
