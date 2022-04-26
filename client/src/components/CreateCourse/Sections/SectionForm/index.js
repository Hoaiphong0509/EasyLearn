import { Button, FormControl, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import s from './styles.module.scss'

function SectionForm(props) {
  const [name, setName] = useState(props.edit ? props.edit.value : '')

  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current.focus()
  })

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      name: name,
      videos: []
    })
    setName('')
  }

  return (
    <FormControl className={s.section_form}>
      {props.edit ? (
        <>
          <TextField
            placeholder="Update your item"
            value={name}
            onChange={handleChange}
            name="name"
            ref={nameRef}
            className={s.textField}
          />
          <Button onClick={handleSubmit}>Update</Button>
        </>
      ) : (
        <>
          <TextField
            placeholder="Add a section"
            value={name}
            onChange={handleChange}
            name="name"
            className={s.textField}
            ref={nameRef}
          />
          <Button onClick={handleSubmit}>Add Section</Button>
        </>
      )}
    </FormControl>
  )
}

export default SectionForm
