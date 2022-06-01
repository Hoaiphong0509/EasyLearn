import { Typography } from '@mui/material'
import CourseList from 'components/CourseList'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import s from '../BlogsPage/styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from 'react-spinkit'
import { getCoursesApproved } from 'services/redux/actions/course'

const CoursesPage = ({
  course: {
    courses,
    loading
  },
  getCoursesApproved
}) => {
  useEffect(() => {
    getCoursesApproved()
  }, [getCoursesApproved])

  const { t } = useTranslation()

  return loading || courses === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <section className={s.root}>
        <div className={s.area}>
          <Typography className={s.index} variant="h2">
            {t('courses')}
          </Typography>
          <CourseList courses={courses} />
        </div>
      </section>
    </React.Fragment>
  )
}

CoursesPage.prototype = {
  course: PropTypes.object.isRequired,
  getCoursesApproved: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, {
  getCoursesApproved
})(CoursesPage)
