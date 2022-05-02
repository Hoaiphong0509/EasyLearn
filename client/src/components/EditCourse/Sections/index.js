import React, { useState } from 'react'

import Section from './Section'
import SectionForm from './SectionForm'

function Sections({ sectionsCrs, onSections }) {
  const [sections, setSections] = useState(sectionsCrs || [])

  const addSection = (section) => {
    if (!section.name || /^\s*$/.test(section.name)) {
      return
    }

    const newSections = [...sections, section]

    setSections(newSections)
    onSections(newSections)
  }

  const updateSection = (sectionId, newValue) => {
    if (!newValue.name || /^\s*$/.test(newValue.name)) {
      return
    }

    const newSections = sections.map((item) =>
      item._id === sectionId ? newValue : item
    )

    setSections(newSections)
    onSections(newSections)
  }

  const removeSection = (_id) => {
    const removedArr = [...sections].filter((section) => section._id !== _id)

    setSections(removedArr)
  }

  return (
    <>
      <SectionForm onSubmit={addSection} />
      <Section
        sections={sections}
        removeSection={removeSection}
        updateSection={updateSection}
      />
    </>
  )
}

export default Sections
