import { Box, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import s from './styles.module.scss'
import { cleanUpCourse } from 'services/redux/actions/course'

const CourseItemSmall = ({ cleanUpCourse, course }) => {
  const { _id, title, img, creator, avatar, user } = course
  return (
    <React.Fragment>
      <Box className={s.root}>
        <Link to={`/courses/course_detail/${_id}`} onClick={cleanUpCourse}>
          <Tooltip title={title} placement="top-start" arrow>
            <div className={s.content}>
              <img src={img} alt="course_img" />
              <Typography className={s.title} variant="p">
                {title}
              </Typography>
            </div>
          </Tooltip>
        </Link>
      </Box>
    </React.Fragment>
  )
}

CourseItemSmall.prototype = {
  cleanUpCourse: PropTypes.func.isRequired
}

export default connect(null, { cleanUpCourse })(CourseItemSmall)
