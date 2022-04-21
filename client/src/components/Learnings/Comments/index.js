import { Box, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'

import s from './styles.module.scss'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Comments = ({ auth: { user }, course, section, video }) => {
  const courseNe = useSelector((state) => state.course)

  useEffect(() => {
    console.log('new courseNe: ', courseNe)

    return () => {
      console.log('Prev courseNe: ', courseNe)
    }
  }, [courseNe])
  return (
    <Box sx={{ padding: '20px' }}>
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
            {video.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                courseId={course._id}
                sectionId={section._id}
                videoId={video._id}
              />
            ))}
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
