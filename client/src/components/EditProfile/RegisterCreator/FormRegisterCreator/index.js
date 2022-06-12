import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { registerCreator } from 'services/redux/actions/user'
import s from './styles.module.scss'
import { isRequired } from 'utils/AppUltils'

const FormRegisterCreator = ({ registerCreator }) => {
  const { t } = useTranslation()
  const [isAccept, setIsAccept] = useState(false)
  const [formData, setFormData] = useState({
    content: ''
  })

  const { content } = formData

  const handleSubmit = (e) => {
    e.preventDefault()
    registerCreator(t, formData)
    setFormData({
      content: ''
    })
  }
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          multiline
          label="Giới thiệu sơ lược"
          placeholder="Tôi là một người sáng tạo nội dung tốt"
          name="content"
          value={content}
          onChange={(e) => setFormData({ [e.target.name]: e.target.value })}
        />
        <FormControlLabel
          control={<Checkbox onChange={(e) => setIsAccept(e.target.checked)} />}
          label="Chấp nhận điều khoản và bảo mật"
        />
      </FormControl>
      <Button
        type="submit"
        className={s.btnGetInTouch}
        variant="contained"
        disabled={!(isAccept && isRequired(formData.content))}
      >
        {t('editProfile.creator.getInTouch')}
      </Button>
    </form>
  )
}

FormRegisterCreator.prototype = {
  registerCreator: PropTypes.func.isRequired
}

export default connect(null, { registerCreator })(FormRegisterCreator)
