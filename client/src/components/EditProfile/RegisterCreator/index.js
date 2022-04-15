import React from 'react'
import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import s from './styles.module.scss'
import { registerCreator } from 'services/redux/actions/auth'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const RegisterCreator = ({ registerCreator }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    await registerCreator(t)
    history.replace('/edit-profile')
  }

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
        <form className={s.formControl} onSubmit={onSubmit}>
          <Button type="submit" className={s.btnGetInTouch} variant="contained">
            {t('editProfile.creator.getInTouch')}
          </Button>
        </form>
      </section>
    </React.Fragment>
  )
}

RegisterCreator.prototype = {
  registerCreator: PropTypes.func.isRequired
}

export default connect(null, { registerCreator })(RegisterCreator)
