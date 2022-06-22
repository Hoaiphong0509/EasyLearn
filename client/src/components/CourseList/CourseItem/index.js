import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import s from './styles.module.scss'
import { cleanUpCourse } from 'services/redux/actions/course'
import { cleanUpProfile } from 'services/redux/actions/profile'
import { COURSE_IMG_DEFAULT } from 'constants/AppConstants'
import { scrollToTop } from 'utils/AppUltils'

const CourseItem = ({ cleanUpCourse, cleanUpProfile, course }) => {
  const { _id, user, title, img, author } = course
  return (
    <React.Fragment>
      <Box className={s.root}>
        <Link
          to={`/courses/course_detail/${_id}`}
          onClick={() => {
            cleanUpCourse()
            scrollToTop()
          }}
        >
          <div className={s.content}>
            <img
              src={img && img.length > 0 ? img : COURSE_IMG_DEFAULT}
              alt="course_img"
            />
            <Typography className={s.title} variant="h4">
              {title}
            </Typography>
          </div>
        </Link>
        <div className={s.footer}>
          <Link
            to={`/profile/${user}`}
            onClick={() => {
              cleanUpProfile()
              scrollToTop()
            }}
            className={s.link}
          >
            <Avatar src={author.avatar} alt={author.name} />
            <Typography className={s.creator} variant="p">
              {author.name}
            </Typography>
          </Link>
        </div>
      </Box>
    </React.Fragment>
  )
}

CourseItem.prototype = {
  cleanUpCourse: PropTypes.func.isRequired,
  cleanUpProfile: PropTypes.func.isRequired
}

export default connect(null, { cleanUpCourse, cleanUpProfile })(CourseItem)
