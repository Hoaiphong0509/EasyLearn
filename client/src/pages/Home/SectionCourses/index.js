import React, { useEffect } from 'react'

import { getCourses } from 'services/redux/actions/course'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CourseList from 'components/CourseList'
import Spinner from 'react-spinkit'

const SectionCourses = ({ getCourses, course: { courses, loading } }) => {
  useEffect(async () => {
    getCourses()
  }, [getCourses])

  return loading || courses === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <CourseList courses={courses} />
    </React.Fragment>
  )
}

SectionCourses.prototype = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourses })(SectionCourses)
