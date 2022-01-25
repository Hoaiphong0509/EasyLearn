import { Avatar, FormControl, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

import SendIcon from '@mui/icons-material/Send'

import PropsTypes from 'prop-types'

import { addComment } from 'services/redux/actions/blog'
import { connect } from 'react-redux'

import s from './styles.module.scss'

const CommentForm = ({ blogId, addComment, user }) => {
  const { avatar } = user

  const [text, setText] = useState('')

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault()
        addComment(blogId, { text })
        setText('')
      }}
    >
      <FormControl className={s.formControl}>
        {user && (
          <Avatar
            className={s.avt}
            src={avatar}
            sx={{ width: 68, height: 68 }}
          />
        )}
        <TextField
          label="Comments"
          placeholder="Say something!"
          className={s.textField}
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          required
        />
        <IconButton type="submit" className={s.btnSend}>
          <SendIcon color="primary" sx={{ fontSize: 40 }} />
        </IconButton>
      </FormControl>
    </form>
  )
}

CommentForm.prototype = {
  addComment: PropsTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm)
