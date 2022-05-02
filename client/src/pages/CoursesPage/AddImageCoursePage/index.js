import React, { useEffect } from 'react'

import { getCourse } from 'services/redux/actions/course'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from 'react-spinkit'
import ChangeImg from 'components/CreateCourse/ChangeImg'

const AddImageCoursePage = ({ course: { course, loading }, match }) => {
  useEffect(() => {
    getCourse(match.params.id)
  }, [match.params.id])

  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <ChangeImg course={course} />
    </React.Fragment>
  )
}

AddImageCoursePage.prototype = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourse })(AddImageCoursePage)
