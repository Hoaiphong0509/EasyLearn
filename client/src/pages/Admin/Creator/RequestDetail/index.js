import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import { getRequestCreatorDetail } from 'services/redux/actions/moderator'

import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import GaravatarAndIn4 from 'components/ProfileIn4/GravatarAndIn4'
import s from './styles.module.scss'
import ContentRequest from 'components/Admin/Creator/ContentRequest/Index'

const RequestDetail = ({
  getRequestCreatorDetail,
  request: { request, loading },
  match
}) => {
  useEffect(() => {
    getRequestCreatorDetail(match.params.id)
  }, [getRequestCreatorDetail, match.params.id])

  return loading || request === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <Box className={s.root}>
      <Box className={s.container}>
        <Box className={s.in4}>
          <ContentRequest
            profile={request.profile}
            blogs={request.blogs}
            request={request}
          />
        </Box>
        <Box className={s.gravatar}>
          <GaravatarAndIn4
            numberCourses={0}
            numberBlogs={request.blogs.length}
            social={request.profile.social && request.profile.social}
            avatar={request.request.author.avatar}
          />
        </Box>
      </Box>
    </Box>
  )
}

RequestDetail.prototype = {
  getRequestCreatorDetail: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request
})

export default connect(mapStateToProps, {
  getRequestCreatorDetail
})(RequestDetail)
