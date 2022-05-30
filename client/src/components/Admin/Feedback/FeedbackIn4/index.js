import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import s from './styles.module.scss'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const FeedbackIn4 = ({ feedback }) => {
  const { author, title, content, date } = feedback
  return (
    <Box className={s.root}>
      <Box className={s.feedback}>
        <Typography className={s.title} variant="h4">
          {title}
        </Typography>
        <Typography className={s.content} variant="p">
          {content}
        </Typography>
        <Box className={s.author}>
          <Avatar style={{ marginRight: '10px' }} src={author.avatar} />
          <Typography variant="p">{author.email}</Typography>
        </Box>
        <Typography className={s.date}>
          <QueryBuilderIcon color="primary" style={{ marginRight: '10px' }} />
          {date}
        </Typography>
        <Button variant="outlined" color='error' startIcon={<DeleteForeverIcon />}>
          Delete
        </Button>
      </Box>
      <Box className={s.boxImg}>
        <img src="/assets/img/contact.png" alt="feedback" />
      </Box>
    </Box>
  )
}

export default FeedbackIn4
