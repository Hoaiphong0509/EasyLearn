import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import s from './styles.module.scss'
import { isEmail, isRequired } from 'utils/AppUltils'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addModerator } from 'services/redux/actions/admin'

const FormAddModerator = ({ addModerator }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addModerator({ email })
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit} className={s.root}>
      <FormControl className={s.panel}>
        <TextField
          className={s.text}
          placeholder="Email must be registered to EasyLearn in advance"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Button
          className={s.btn}
          variant="contained"
          type="submit"
          disabled={!(email && isRequired(email) && isEmail(email))}
        >
          <AddIcon />
        </Button>
      </FormControl>
    </form>
  )
}

FormAddModerator.prototype = {
  addModerator: PropTypes.func.isRequired
}

export default connect(null, { addModerator })(FormAddModerator)
