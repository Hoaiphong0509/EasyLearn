import React, { useState, useRef } from 'react'
import { Box, Button, FormControl, TextField } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useHistory } from 'react-router-dom'

import s from './styles.module.scss'
import { TINYMCE_API_KEY } from 'constants/AppConstants'
import { isRequired } from 'utils/AppUltils'
import PropTypes from 'prop-types'

import JoditEditor from 'jodit-react'
import { addBlog } from 'services/redux/actions/blog'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

const CreateBlog = ({ addBlog }) => {
  const textRef = useRef(null)
  const history = useHistory()

  const [formData, setFormData] = useState({
    title: '',
    text: ''
  })

  const { title, text } = formData

  const handleChangeTitle = (e) => {
    setFormData({ ...formData, title: e.target.value })
  }
  const handleChangeText = (e) => {
    setFormData({ ...formData, text: e })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addBlog(formData)
    history.push('/')
  }

  return (
    <Box className={s.root}>
      <form onSubmit={handleSubmit} className={s.form}>
        <FormControl className={s.formControl}>
          <TextField
            className={s.textField}
            value={title}
            name="title"
            label="Title"
            placeholder="Tiêu đề bài blog của bạn"
            onChange={handleChangeTitle}
          />
          <JoditEditor
            ref={textRef}
            className={s.editorField}
            value={text}
            name="text"
            config={{ width: '80%', height: '600px' }}
            onChange={handleChangeText}
          />
          <Button
            className={s.btn}
            disabled={!isRequired(formData.title) || !isRequired(formData.text)}
            type="submit"
          >
            Save
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}

CreateBlog.prototype = {
  addBlog: PropTypes.func.isRequired
}

export default connect(null, { addBlog })(CreateBlog)
