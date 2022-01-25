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

import { deleteEducation } from 'services/redux/actions/profile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import s from './styles.module.scss'

const EducationItem = ({ deleteEducation, education }) => {
  const { t } = useTranslation()
  const { _id, school, degree, fieldofstudy, from, to, current, description } =
    education

  return (
    <React.Fragment>
      <Card className={s.card}>
        <CardContent className={s.cardContent}>
          <Typography className={s.school} variant="h5">
            {school}
          </Typography>
          <Typography className={s.degree} variant="h6">
            {degree}
          </Typography>
          <Typography className={s.fieldofstudy} variant="h6">
            {fieldofstudy}
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
            onClick={() => deleteEducation(_id)}
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

EducationItem.prototype = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(EducationItem)
