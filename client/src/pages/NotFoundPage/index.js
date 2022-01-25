import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'

const NotFoundPage = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <Box className={s.root}>
      <Box className={s.notFound}>
        <Box className={s.bg_page}>
          <div className={s.not_found}></div>
          <div className={s.not_found}></div>
          <div className={s.not_found}></div>
        </Box>
        <Typography className={s.title} variant="h1">
          {t('notFound.title')}
        </Typography>
        <Typography className={s.err} variant="h4">
          ❌❌❌
        </Typography>
        <Typography className={s.desc} variant="h3">
          {t('notFound.desc')}
        </Typography>
        <Button className={s.btn} onClick={() => history.push('/')}>
          {t('notFound.goHome')}
        </Button>
      </Box>
    </Box>
  )
}

export default NotFoundPage
