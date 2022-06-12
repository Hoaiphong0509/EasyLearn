import { ArrowForwardIos, Email } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import React from 'react'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  acceptRequestCreator,
  dennyRequestCreator
} from 'services/redux/actions/moderator'

import { useTranslation } from 'react-i18next'
import BlogItemSmall from 'components/ProfileIn4/GeneralIn4/BlogItemSmall'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import { useHistory } from 'react-router-dom'

const ContentRequest = ({
  profile,
  request,
  blogs,
  acceptRequestCreator,
  dennyRequestCreator
}) => {
  const { knowAs, bio, skills } = profile
  const { request: requestData } = request
  const { content, _id } = requestData
  const history = useHistory()

  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Box className={s.root}>
        <Stack className={s.stack} spacing={2}>
          <Typography className={s.name} variant="h3">
            {knowAs}
          </Typography>
          <Typography className={s.bio} variant="h5">
            {bio}
          </Typography>
          <Box className={s.skillsBox}>
            <Typography className={s.contact} variant="h6">
              {t('profile.skills')}
            </Typography>
            {skills.map((skill, index) => (
              <Chip className={s.skill} key={index} label={skill} />
            ))}
          </Box>
          <Divider />
          <Box className={s.contentBox}>
            <Box>
              <Typography className={s.contact} variant="h6">
                {t('profile.content')}
              </Typography>
              <Box className={s.tabsBox}>
                <Box className={s.boxPanel}>
                  {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <BlogItemSmall key={blog._id} blog={blog} />
                    ))
                  ) : (
                    <Typography>
                      Người dùng này chưa có bài blogs nào
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box className={s.contentBox}>
              <Typography className={s.titleContent} variant="h6">
                Nội dung yêu cầu trở thành cộng tác viên (Creator)
              </Typography>
              <Typography className={s.content} variant="p">
                {content}
              </Typography>
            </Box>
            <Divider />
            <Box className={s.interaction} sx={{ padding: ' 10px 0' }}>
              <Button
                variant="contained"
                color="info"
                endIcon={<CheckCircleOutlineIcon />}
                onClick={async () => {
                  await acceptRequestCreator(_id)
                  history.replace('/admin/creator')
                }}
              >
                Chấp nhận
              </Button>
              <Button
                variant="contained"
                color="warning"
                endIcon={<DoNotDisturbAltIcon />}
                onClick={async () => {
                  await dennyRequestCreator(_id)
                  history.replace('/admin/creator')
                }}
              >
                Từ chối
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  )
}

ContentRequest.prototype = {
  acceptRequestCreator: PropTypes.func.isRequired,
  dennyRequestCreator: PropTypes.func.isRequired
}

export default connect(null, {
  acceptRequestCreator,
  dennyRequestCreator
})(ContentRequest)
