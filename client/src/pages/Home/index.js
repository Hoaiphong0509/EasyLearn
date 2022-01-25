import { Grid, Typography } from '@mui/material'
import Banner from 'components/Banner'
import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'
import CarouselBanner from 'components/CarouselBanner'
import CourseList from 'components/CourseList'
import BlogsList from 'components/BlogsList'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getBlogs } from 'services/redux/actions/blog'
import { getCourses } from 'services/redux/actions/course'
import SectionBlogs from './SectionBlogs'
import SectionCourses from './SectionCourses'
const Home = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <section className={s.root}>
        <CarouselBanner />
        <div className={s.courseArea}>
          <Typography className={s.index} variant="h2">
            {t('courses')}
          </Typography>
          <SectionCourses />
        </div>
        <div className={s.blogArea}>
          <Typography className={s.index} variant="h2">
            {t('blogs')}
          </Typography>
          <SectionBlogs />
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home
