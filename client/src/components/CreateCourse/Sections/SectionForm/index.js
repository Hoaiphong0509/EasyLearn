import { Button, FormControl, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import s from './styles.module.scss'
import { useTranslation } from 'react-i18next'

function SectionForm(props) {
  const { t } = useTranslation()
  console.log('props.edit', props.edit)
  const [name, setName] = useState(props.edit ? props.edit.name : '')
  const [id] = useState(
    props.edit ? props.edit.id : Math.floor(Math.random() * 10000)
  )
  const [videos] = useState(props.edit ? props.edit.videos : [])
  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current.focus()
  })

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    props.onSubmit({
      id,
      name,
      videos
    })
    setName('')
  }

  return (
    <FormControl className={s.section_form}>
      {props.edit ? (
        <>
          <TextField
            placeholder={t('course.createCourse.uptSection')}
            value={name}
            onChange={handleChange}
            name="name"
            ref={nameRef}
            className={s.textField}
          />
          <Button onClick={handleSubmit}>
            {t('course.createCourse.uptSection')}
          </Button>
        </>
      ) : (
        <>
          <TextField
            placeholder={t('course.createCourse.addSection')}
            value={name}
            onChange={handleChange}
            name="name"
            className={s.textField}
            ref={nameRef}
          />
          <Button onClick={handleSubmit}>
            {t('course.createCourse.addSection')}
          </Button>
        </>
      )}
    </FormControl>
  )
}

export default SectionForm
