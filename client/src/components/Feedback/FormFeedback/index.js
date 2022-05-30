import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import cn from 'classnames'
import s from './styles.module.scss'
import useStyle from './useStyle'
import { isRequired } from 'utils/AppUltils'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendFeedback } from 'services/redux/actions/user'

const FormFeedback = ({ auth: { user }, sendFeedback }) => {
  const c = useStyle()
  const [formData, setFormData] = useState({
    avatar: user && user.avatar,
    email: user && user.email,
    title: '',
    content: ''
  })

  const { email, title, content } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendFeedback(formData)
    setFormData({
      avatar: user ? user.avatar : '',
      email: user ? user.email : '',
      title: '',
      content: ''
    })
  }

  return (
    <form className={cn(s.form, c.form)} onSubmit={handleSubmit}>
      <FormControl className={s.panel}>
        <TextField
          className={s.textField}
          label="Email"
          name="email"
          value={user ? user.email : email}
          disabled={user && user.email}
          onChange={handleChange}
          placeholder="EX: easyLearn@gmail.com"
        />
        <TextField
          className={s.textField}
          label="Title*"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Nội dung"
        />
        <TextField
          className={s.textField}
          name="content"
          value={content}
          onChange={handleChange}
          minRows="5"
          label="Description*"
          placeholder="Mô tả"
          multiline
        />
      </FormControl>
      <FormControl className={s.panel}>
        <Button
          className={s.btn}
          type="submit"
          disabled={
            !(isRequired(formData.title) && isRequired(formData.content))
          }
        >
          Gửi
        </Button>
      </FormControl>
    </form>
  )
}

FormFeedback.prototype = {
  sendFeedback: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { sendFeedback })(FormFeedback)
