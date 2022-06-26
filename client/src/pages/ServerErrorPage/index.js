import { Box, Button, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import s from './styles.module.scss'

const ServerErrorPage = () => {
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
          {t('serverErr.title')}
        </Typography>
        <Typography className={s.err} variant="h4">
          ❌❌❌
        </Typography>
        <Typography className={s.desc} variant="h3">
          {t('serverErr.desc')}
        </Typography>
        <Button className={s.btn} onClick={() => history.push('/')}>
          {t('notFound.goHome')}
        </Button>
      </Box>
    </Box>
  )
}

export default ServerErrorPage
