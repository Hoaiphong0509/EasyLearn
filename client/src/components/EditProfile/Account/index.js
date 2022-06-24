import {
  Box,
  Chip,
  FormControl,
  TextField
} from '@mui/material'
import React, { useState } from 'react'

import s from './styles.module.scss'

const Account = ({ user }) => {
  const { name, email } = user
  const [formData, setFormData] = useState({
    name,
    email
  })

  const { name: nameUser, email: emailUser } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <React.Fragment>
      <Box className={s.root}>
        <form className={s.form} onSubmit={handleSubmit}>
          <FormControl className={s.formControl}>
            <Chip label="Name" className={s.chip} />
            <TextField
              className={s.textField}
              name="name"
              value={nameUser}
              onChange={handleChange}
              disabled={true}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Chip label="Email" className={s.chip} />
            <TextField
              className={s.textField}
              name="email"
              value={emailUser}
              onChange={handleChange}
              disabled={true}
            />
          </FormControl>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default Account
