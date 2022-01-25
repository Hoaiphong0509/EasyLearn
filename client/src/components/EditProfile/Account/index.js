import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  TextField
} from '@mui/material'
import React, { useState } from 'react'

import s from './styles.module.scss'

const Account = ({ user }) => {
  const { name, email } = user
  const [formData, setFormData] = useState({
    name,
    email,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const {
    name: nameUser,
    email: emailUser,
    oldPassword,
    newPassword,
    confirmPassword
  } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(formData)
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
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Chip label="Email" className={s.chip} />
            <TextField
              className={s.textField}
              name="email"
              value={emailUser}
              onChange={handleChange}
            />
          </FormControl>
          <Divider sx={{ margin: '20px 0' }} />
          <FormControl className={s.formControl}>
            <Chip label="Old Password" className={s.chip} />
            <TextField
              className={s.textField}
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              type="password"
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Chip label="New Password" className={s.chip} />
            <TextField
              className={s.textField}
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              type="password"
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <Chip label="Confirm Password" className={s.chip} />
            <TextField
              className={s.textField}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              type="password"
            />
          </FormControl>
          <Button className={s.btnSubmit} type="submit">
            Save
          </Button>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default Account
