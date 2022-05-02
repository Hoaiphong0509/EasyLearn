import React, { useEffect, useState } from 'react'

import { getCourse, addSections } from 'services/redux/actions/course'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from 'react-spinkit'
import Sections from 'components/AddSectionsCourse/Sections'
import { Box, Button, FormControl, Typography } from '@mui/material'
import { Prompt, useHistory } from 'react-router-dom'
import s from './styles.module.scss'
import { COURSE_IMG_DEFAULT } from 'constants/AppConstants'

const AddSectionsCoursePage = ({
  course: { course, loading },
  getCourse,
  addSections,
  match
}) => {
  const history = useHistory()
  const [onEditing, setOnEditing] = useState(
    course.sections.length > 0 ? false : true
  )

  useEffect(() => {
    getCourse(match.params.id)
  }, [getCourse, match.params.id])

  const [sectionsData, setSectionsData] = useState({
    sections: []
  })

  const crs = useSelector((state) => state.course)
  useEffect(() => {
    console.log('new course: ', crs)

    if (crs && crs.course && crs.course.sections.length > 0)
      history.push(`/courses/add_img/${crs.course._id}`)
    return () => {
      console.log('Prev course: ', crs)
    }
  }, [crs, history])

  const handleSections = (sections) => {
    setSectionsData({ sections: sections })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOnEditing(false)
    await addSections(course._id, sectionsData)
    history.push(`/courses/add_img/${course._id}`)
  }

  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <Prompt
        when={onEditing}
        message="Are you sure you want to leave the page?"
      />
      <Box className={s.root}>
        <form className={s.form} onSubmit={handleSubmit}>
          <FormControl className={s.formControlImg}>
            <img src={COURSE_IMG_DEFAULT} alt="img" />
          </FormControl>

          <FormControl className={s.formControl}>
            <div className={s.header}>
              <Typography variant="h3" className={s.title}>
                Nội dung khóa học
              </Typography>
            </div>
            <Sections
              onSections={handleSections}
              sectionsCrs={course.sections}
            />
          </FormControl>

          <FormControl className={s.footer}>
            <Button type="submit" className={s.buttonSubmit}>
              Save
            </Button>
          </FormControl>
        </form>
      </Box>
    </React.Fragment>
  )
}

AddSectionsCoursePage.prototype = {
  course: PropTypes.object.isRequired,
  getCourse: PropTypes.func.isRequired,
  addSections: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourse, addSections })(
  AddSectionsCoursePage
)
