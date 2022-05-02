import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, FormControl, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import s from './styles.module.scss'
import { isRequired } from 'utils/AppUltils'
import PropTypes from 'prop-types'

import HtmlEditor, {
  Toolbar,
  MediaResizing,
  Item
} from 'devextreme-react/html-editor'

import { addBlog } from 'services/redux/actions/blog'
import { connect } from 'react-redux'

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt']
const fontValues = [
  'Arial',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Times New Roman',
  'Verdana'
]
const headerValues = [false, 1, 2, 3, 4, 5]

const CreateBlog = ({ addBlog }) => {
  const textRef = useRef(null)
  const history = useHistory()

  const [formData, setFormData] = useState({
    title: '',
    text: ''
  })

  const { title, text } = formData

  const blg = useSelector((state) => state.blog)

  useEffect(() => {
    console.log('new blog: ', blg)

    if (blg && blg.blog) history.push(`/blogs/add_img/${blg.blog._id}`)
    return () => {
      console.log('Prev blog: ', blg)
    }
  }, [blg, history])

  const handleChangeTitle = (e) => {
    setFormData({ ...formData, title: e.target.value })
  }
  const handleChangeText = (e) => {
    setFormData({ ...formData, text: e })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBlog(formData)
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
          <HtmlEditor
            height="725px"
            onValueChange={handleChangeText}
            ref={textRef}
            className={s.editorField}
            value={text}
            name="text"
          >
            <MediaResizing enabled={true} />
            <Toolbar multiline={true}>
              <Item name="undo" />
              <Item name="redo" />
              <Item name="separator" />
              <Item name="size" acceptedValues={sizeValues} />
              <Item name="font" acceptedValues={fontValues} />
              <Item name="separator" />
              <Item name="bold" />
              <Item name="italic" />
              <Item name="strike" />
              <Item name="underline" />
              <Item name="separator" />
              <Item name="alignLeft" />
              <Item name="alignCenter" />
              <Item name="alignRight" />
              <Item name="alignJustify" />
              <Item name="separator" />
              <Item name="orderedList" />
              <Item name="bulletList" />
              <Item name="separator" />
              <Item name="header" acceptedValues={headerValues} />
              <Item name="separator" />
              <Item name="color" />
              <Item name="background" />
              <Item name="separator" />
              <Item name="link" />
              <Item name="image" />
              <Item name="separator" />
              <Item name="clear" />
              <Item name="codeBlock" />
              <Item name="blockquote" />
              <Item name="separator" />
              <Item name="insertTable" />
              <Item name="deleteTable" />
              <Item name="insertRowAbove" />
              <Item name="insertRowBelow" />
              <Item name="deleteRow" />
              <Item name="insertColumnLeft" />
              <Item name="insertColumnRight" />
              <Item name="deleteColumn" />
            </Toolbar>
          </HtmlEditor>
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
