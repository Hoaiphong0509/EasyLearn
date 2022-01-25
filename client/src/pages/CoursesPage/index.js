import { Grid, Typography } from '@mui/material'
import Banner from 'components/Banner'
import CourseList from 'components/CourseList'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import s from '../BlogsPage/styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCourses } from 'services/redux/actions/course'

const CoursesPage = ({ getCourses, course: { courses } }) => {
  useEffect(() => {
    getCourses()
  }, [getCourses])
  const { t } = useTranslation()

  return (
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
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourses })(CoursesPage)
