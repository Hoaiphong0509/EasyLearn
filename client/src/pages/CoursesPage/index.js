import { Typography } from '@mui/material'
import CourseList from 'components/CourseList'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import s from '../BlogsPage/styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from 'react-spinkit'
import { getCourses } from 'services/redux/actions/course'
import { getCurrentProfile } from 'services/redux/actions/profile'

const CoursesPage = ({
  course: {
    courses,
    loading: { ld_crs }
  },
  profile: {
    profile,
    loading: { ld_pf }
  },
  getCourses,
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile()
    getCourses()
  }, [getCourses, getCurrentProfile])
  const { t } = useTranslation()

  return ld_crs || ld_pf || courses === null || profile === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <section className={s.root}>
        <div className={s.area}>
          <Typography className={s.index} variant="h2">
            {t('courses')}
          </Typography>
          <CourseList courses={courses} profile={profile} />
        </div>
      </section>
    </React.Fragment>
  )
}

CoursesPage.prototype = {
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course,
  profile: state.profile
})

export default connect(mapStateToProps, { getCourses, getCurrentProfile })(
  CoursesPage
)
