import { Typography } from '@mui/material'
import React from 'react'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'
import CarouselBanner from 'components/CarouselBanner'

import SectionCourses from './SectionCourses'
import SectionBlogs from './SectionBlogs'

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
