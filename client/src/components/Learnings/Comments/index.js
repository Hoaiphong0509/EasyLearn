import { Box, Divider } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import s from './styles.module.scss'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Comments = ({ auth: { user }, course, section, video }) => {
  console.log(video && video.comments)
  return (
    <Box className={s.root} sx={{ padding: '20px' }}>
      {video && (
        <>
          <CommentForm
            courseId={course._id}
            sectionId={section._id}
            videoId={video._id}
            user={user}
          />
          <Divider />
          <Box className={s.cmtList}>
            {course.comments.map((comment, index) => {
              if (comment.videoId === video._id)
                return (
                  <CommentItem
                    key={index}
                    comment={comment}
                    courseId={course._id}
                  />
                )
              else return null
            })}
          </Box>
        </>
      )}
    </Box>
  )
}

Comments.prototype = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Comments)
