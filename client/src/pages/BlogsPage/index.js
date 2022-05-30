import { Typography } from '@mui/material'
import BlogsList from 'components/BlogsList'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getBlogsApproved } from 'services/redux/actions/blog'

const BlogsPage = ({ getBlogsApproved, blog: { blogs } }) => {
  useEffect(() => {
    getBlogsApproved()
  }, [getBlogsApproved])

  const { t } = useTranslation()

  return (
    <React.Fragment>
      <section className={s.root}>
        <div className={s.area}>
          <Typography className={s.index} variant="h2">
            {t('blogs')}
          </Typography>
          <BlogsList blogs={blogs} />
        </div>
      </section>
    </React.Fragment>
  )
}

BlogsPage.prototype = {
  getBlogsApproved: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlogsApproved })(BlogsPage)
