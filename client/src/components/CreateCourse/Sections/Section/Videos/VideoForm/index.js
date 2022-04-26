import { Button, FormControl, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { getCodeYoutube } from 'utils/AppUltils'

import s from './styles.module.scss'

function VideoForm(props) {
  const [name, setName] = useState(props.edit ? props.edit.value : '')
  const [link, setLink] = useState(props.edit ? props.edit.value : '')

  const nameRef = useRef(null)
  const linkRef = useRef(null)

  useEffect(() => {
    nameRef.current.focus()
  })

  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeLink = (e) => {
    setLink(e.target.value)
  }

  const handleSubmit = (e) => {
    if (name && link) {
      props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        name: name,
        link: getCodeYoutube(link)
      })
      setName('')
      setLink('')
    }
  }
  return (
    <FormControl className={s.video_form}>
      {props.edit ? (
        <>
          <TextField
            className={s.textField}
            placeholder="Update your name video"
            value={name}
            onChange={handleChangeName}
            name="name"
            ref={nameRef}
          />
          <TextField
            className={s.textField}
            placeholder="Update your link video"
            value={link}
            onChange={handleChangeLink}
            name="link"
            ref={linkRef}
          />
          <Button onClick={handleSubmit}>Update</Button>
        </>
      ) : (
        <>
          <TextField
            className={s.textField}
            placeholder="Add a name"
            value={name}
            onChange={handleChangeName}
            name="name"
            ref={nameRef}
          />
          <TextField
            className={s.textField}
            placeholder="Add a link"
            value={link}
            onChange={handleChangeLink}
            name="link"
            ref={linkRef}
          />
          <Button onClick={handleSubmit}>Add Videos</Button>
        </>
      )}
    </FormControl>
  )
}

export default VideoForm
