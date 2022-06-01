import { Box, Typography } from '@mui/material'
import FormFeedback from 'components/Feedback/FormFeedback'
import React from 'react'
import s from './styles.module.scss'

const FeedbackPage = () => {
  return (
    <Box className={s.root}>
      <Box className={s.feedback}>
        <Typography variant="h4" style={{ textTransform: 'uppercase', marginBottom: '20px' }}>
          Đóng góp ý kiến && Báo cáo
        </Typography>
        <FormFeedback />
      </Box>
      <Box className={s.boxImg}>
        <img src="/assets/img/study.png" alt="feedback" />
      </Box>
    </Box>
  )
}

export default FeedbackPage
