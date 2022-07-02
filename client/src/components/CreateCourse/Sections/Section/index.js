import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import SectionForm from '../SectionForm'
import Videos from './Videos'

import s from './styles.module.scss'

const Section = ({ sections, removeSection, updateSection }) => {
  const [edit, setEdit] = useState({
    id: null,
    name: '',
    videos: []
  })

  const submitUpdate = (value) => {
    updateSection(edit.id, value)
    setEdit({
      id: null,
      name: '',
      videos: []
    })
  }

  const handleSetVideo = (index, video) => {
    setEdit({ ...edit, videos: video })
    updateSection(sections[index].id, { ...sections[index], videos: video })
  }

  if (edit.id) {
    return <SectionForm edit={edit} onSubmit={submitUpdate} />
  }

  return sections.map((section, index) => {
    return (
      <div className={s.section_row} key={index}>
        <section className={s.section}>
          <div key={section.id}>{section.name}</div>
          <div className={s.icons}>
            <IconButton
              color="error"
              variant="outlined"
              onClick={() => removeSection(section.id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton
              color="primary"
              variant="outlined"
              onClick={() =>
                setEdit({
                  id: section.id,
                  name: section.name,
                  videos: section.videos
                })
              }
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
