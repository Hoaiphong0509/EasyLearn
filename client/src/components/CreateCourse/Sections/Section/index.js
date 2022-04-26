import React, { useState } from 'react'
import SectionForm from '../SectionForm'
import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import Videos from './Videos'

import s from './styles.module.scss'

const Section = ({
  sections,
  completeSection,
  removeSection,
  updateSection,
  onSections
}) => {
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


  const handleSetVideo = (index, video) =>{
    
    setEdit({...edit, videos:video})
    // onSections({...edit, videos:video});
    updateSection(sections[index].id, {...sections[index], videos:video});
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
            <Button
              color="error"
              className={s.btn}
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => removeSection(section.id)}
            />
            <Button
              className={s.btn}
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() =>
                setEdit({
                  id: section.id,
                  name: section.name
                })
              }
            />
          </div>
        </section>
        <section className={s.videos}>
          <Videos key={index} index={index} videos={section.videos} setVideo={handleSetVideo} />
        </section>
      </div>
    )
  })
}

export default Section
