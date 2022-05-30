import { Box } from '@mui/material'
import FormFeedback from 'components/Feedback/FormFeedback'
import React from 'react'
import s from './styles.module.scss'

const FeedbackPage = () => {
  return (
    <Box className={s.root}>
      <Box className={s.feedback}>
        <FormFeedback />
      </Box>
      <Box className={s.boxImg}>
        <img
          src="/assets/img/study.png"
          alt="feedback"
        />
      </Box>
    </Box>
  )
}

export default FeedbackPage
