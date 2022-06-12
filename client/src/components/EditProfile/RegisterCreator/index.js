import React from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import s from './styles.module.scss'
import FormRegisterCreator from './FormRegisterCreator'

const RegisterCreator = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <section className={s.root}>
        <div className={s.benefit}>
          <Typography variant="h4" className={s.title}>
            {t('editProfile.creator.benefits')}
          </Typography>
          <ul className={s.listBen}>
            <li>{t('editProfile.creator.ben1')}</li>
            <li>{t('editProfile.creator.ben2')}</li>
            <li>{t('editProfile.creator.ben3')}</li>
            <li>{t('editProfile.creator.ben4')}</li>
          </ul>
        </div>
        <FormRegisterCreator />
      </section>
    </React.Fragment>
  )
}

export default RegisterCreator
