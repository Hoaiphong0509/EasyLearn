import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
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

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import BlogItemSmall from 'components/ProfileIn4/GeneralIn4/BlogItemSmall'
import { useTranslation } from 'react-i18next'
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
                      Ng?????i d??ng n??y ch??a c?? b??i blogs n??o
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box className={s.contentBox}>
              <Typography className={s.titleContent} variant="h6">
                N???i dung y??u c???u tr??? th??nh c???ng t??c vi??n (Creator)
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
                Ch???p nh???n
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
                T??? ch???i
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
