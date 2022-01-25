import { Box, List } from '@mui/material'
import React, { useEffect } from 'react'

import s from './styles.module.scss'

import PropTypes from 'prop-types'

import { getCourse } from 'services/redux/actions/course'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Study from 'components/Learnings/Study'

const AreaLearning = ({ getCourse, course: { course, loading }, match }) => {
  useEffect(() => {
    getCourse(match.params.id)
  }, [getCourse, match.params.id])

  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <Study course={course} />
    </React.Fragment>
  )
}

AreaLearning.prototype = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourse })(AreaLearning)
