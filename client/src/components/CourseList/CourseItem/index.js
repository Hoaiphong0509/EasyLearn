import { Box, Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import s from './styles.module.scss'
import { cleanUpCourse } from 'services/redux/actions/course'
import { cleanUpProfile } from 'services/redux/actions/profile'

const CourseItem = ({ cleanUpCourse, cleanUpProfile, course }) => {
  const { _id, title, img, creator, avatar, user } = course
  return (
    <React.Fragment>
      <Box className={s.root}>
        <Link to={`/courses/course_detail/${_id}`} onClick={cleanUpCourse}>
          <div className={s.content}>
            <img src={img} alt="course_img" />
            <Typography className={s.title} variant="h4">
              {title}
            </Typography>
          </div>
        </Link>
        <div className={s.footer}>
          <Link
            to={`/profile/${user}`}
            onClick={cleanUpProfile}
            className={s.link}
          >
            <img src={avatar} alt="avt_creator" />
            <Typography className={s.creator} variant="p">
              {creator}
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
