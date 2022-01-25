import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import s from './styles.module.scss'
import { connect } from 'react-redux'
import { getCourse } from 'services/redux/actions/course'
import Spinner from 'react-spinkit'
import CourseIn4 from 'components/CourseList/CourseIn4'

const CourseDetail = ({ getCourse, course: { course, loading }, match }) => {
  useEffect(() => {
    getCourse(match.params.id)
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
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourse })(CourseDetail)
