import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'

import { useTranslation } from 'react-i18next'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import moment from 'moment'

import { deleteExperience } from 'services/redux/actions/profile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import s from './styles.module.scss'

const ExperienceItem = ({ deleteExperience, experience }) => {
  const { t } = useTranslation()

  const { _id, title, company, location, from, to, current, description } =
    experience

  return (
    <React.Fragment>
      <Card className={s.card}>
        <CardContent className={s.cardContent}>
          <Typography className={s.title} variant="h5">
            {title}
          </Typography>
          <Typography className={s.company} variant="h6">
            {company}
          </Typography>
          <Typography className={s.location} variant="h6">
            {location}
          </Typography>
          <Stack display="flex" direction="row" spacing={2} className={s.stack}>
            <Typography className={s.from}>
              {moment(from).format('l')}
            </Typography>
            <ArrowForwardIcon className={s.arrow} />
            <Typography className={s.to}>
              {current ? 'current' : moment(to).format('l')}
            </Typography>
          </Stack>
          <Typography variant="p" className={s.desc}>
            {description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className={s.cardActions}>
          <Button
            onClick={() => deleteExperience(_id)}
            className={s.btn}
            color="error"
          >
            {t('delete')}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  )
}

ExperienceItem.prototype = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(ExperienceItem)
