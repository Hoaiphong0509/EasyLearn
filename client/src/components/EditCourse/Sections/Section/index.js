import React, { useState } from 'react'
import { Button, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import Videos from './Videos'

import s from './styles.module.scss'
import SectionForm from '../SectionForm'

const Section = ({ sections, removeSection, updateSection }) => {
  const [edit, setEdit] = useState({
    _id: null,
    name: '',
    videos: []
  })

  const submitUpdate = (value) => {
    updateSection(edit._id, value)
    setEdit({
      _id: null,
      name: '',
      videos: []
    })
  }
  const handleSetVideo = (index, video) => {
    setEdit({ ...edit, videos: video })
    updateSection(sections[index]._id, {
      ...sections[index],
      videos: video
    })
  }

  if (edit._id) {
    return <SectionForm edit={edit} onSubmit={submitUpdate} />
  }

  return sections.map((section, index) => {
    return (
      <div className={s.section_row} key={index}>
        <section className={s.section}>
          <div key={section._id}>{section.name}</div>
          <div className={s.icons}>
            <IconButton
              color="error"
              variant="outlined"
              onClick={() => removeSection(section._id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton
              color="primary"
              variant="outlined"
              onClick={() => {
                setEdit({
                  _id: section._id,
                  name: section.name,
                  videos: section.videos
                })
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        </section>
        <section className={s.videos}>
          <Videos
            key={index}
            index={index}
            videos={section.videos}
            setVideo={handleSetVideo}
          />
        </section>
      </div>
    )
  })
}

export default Section
