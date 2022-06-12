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

  const tempCrs =
    courses &&
    courses.sort(function (a, b) {
      const keyA = a.students.length,
        keyB = b.students.length
      if (keyA < keyB) return 1
      if (keyA > keyB) return -1
      return 0
    })

  return loading || courses === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <CourseList courses={tempCrs.slice(0, 3)} />
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
