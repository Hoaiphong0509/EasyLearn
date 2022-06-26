import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import { Avatar, Box, Button, Typography } from '@mui/material'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteFeedback } from 'services/redux/actions/moderator'

import moment from 'moment'

const FeedbackIn4 = ({ feedback, deleteFeedback }) => {
  const { _id, author, title, content, date } = feedback
  const history = useHistory()
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
          {moment(date).format('DD-MM-YYYY')}
        </Typography>
        <Button
          onClick={async () => {
            await deleteFeedback(_id)
            history.replace('/admin/feedback')
          }}
          variant="outlined"
          color="error"
          startIcon={<DeleteForeverIcon />}
        >
          Delete
        </Button>
      </Box>
      <Box className={s.boxImg}>
        <img src="/assets/img/contact.png" alt="feedback" />
      </Box>
    </Box>
  )
}

FeedbackIn4.prototype = {
  deleteFeedback: PropTypes.func.isRequired
}

export default connect(null, { deleteFeedback })(FeedbackIn4)
