import { Button, FormControl, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { getCodeYoutube } from 'utils/AppUltils'

import s from './styles.module.scss'

import { useTranslation } from 'react-i18next'

function VideoForm(props) {
  const { t } = useTranslation()
  const [name, setName] = useState(props.edit ? props.edit.name : '')
  const [link, setLink] = useState(props.edit ? props.edit.link : '')

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
            placeholder={t('course.createCourse.uptVideoName')}
            value={name}
            onChange={handleChangeName}
            name="name"
            ref={nameRef}
          />
          <TextField
            className={s.textField}
            placeholder={t('course.createCourse.uptLinkVideo')}
            value={link}
            onChange={handleChangeLink}
            name="link"
            ref={linkRef}
          />
          <Button onClick={handleSubmit}>
            {t('course.createCourse.uptVideos')}
          </Button>
        </>
      ) : (
        <>
          <TextField
            className={s.textField}
            placeholder={t('course.createCourse.addVideoName')}
            value={name}
            onChange={handleChangeName}
            name="name"
            ref={nameRef}
          />
          <TextField
            className={s.textField}
            placeholder={t('course.createCourse.addLinkVideo')}
            value={link}
            onChange={handleChangeLink}
            name="link"
            ref={linkRef}
          />
          <Button onClick={handleSubmit}>
            {t('course.createCourse.addVideos')}
          </Button>
        </>
      )}
    </FormControl>
  )
}

export default VideoForm
