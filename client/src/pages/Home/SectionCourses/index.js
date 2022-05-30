import React, { useEffect } from 'react'

import { getCoursesApproved } from 'services/redux/actions/course'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CourseList from 'components/CourseList'
import Spinner from 'react-spinkit'

const SectionCourses = ({
  getCoursesApproved,
  course: { courses, loading }
}) => {
  useEffect(() => {
    getCoursesApproved()
  }, [getCoursesApproved])

  return loading || courses === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <CourseList courses={courses} />
    </React.Fragment>
  )
}

SectionCourses.prototype = {
  getCoursesApproved: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCoursesApproved })(SectionCourses)
