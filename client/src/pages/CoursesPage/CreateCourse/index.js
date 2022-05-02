import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Prompt, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import s from './styles.module.scss'

import PropTypes from 'prop-types'

import { addCourse } from 'services/redux/actions/course'
import { connect } from 'react-redux'
import { COURSE_IMG_DEFAULT } from 'constants/AppConstants'
import Sections from 'components/CreateCourse/Sections'

const CreateCourse = ({ addCourse }) => {
  const history = useHistory()
  const [isChange, setIsChange] = useState(false)

  const courseDraft = JSON.parse(localStorage.getItem('courseDraft'))
  // console.log(JSON.parse(courseDraft))
  const [courseData, setCourseData] = useState(
    courseDraft
      ? {
          title: courseDraft.title,
          description: courseDraft.description,
          punchLike: courseDraft.punchLike,
          gains: courseDraft.gains,
          requires: courseDraft.requires
        }
      : {
          title: '',
          description: '',
          punchLike: '',
          gains: '',
          requires: '',
          sections: []
        }
  )

  const crs = useSelector((state) => state.course)

  useEffect(() => {
    console.log('new course: ', crs)

    if (crs && crs.course)
      history.push(`/courses/add_sections/${crs.course._id}`)
    return () => {
      console.log('Prev course: ', crs)
    }
  }, [crs, history])

  const { title, description, punchLike, gains, requires } = courseData

  const handleChange = (e) => {
    setIsChange(true)
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
    localStorage.setItem(
      'courseDraft',
      JSON.stringify({ ...courseData, [e.target.name]: e.target.value })
    )
  }

  const handleSubmit = (e) => {
    try {
      setIsChange(false)
      e.preventDefault()
      // localStorage.removeItem('courseDraft')
      addCourse(courseData)
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <Prompt
        when={isChange}
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
                Thông tin chung
              </Typography>
            </div>
            <TextField
              label="Tên khóa học"
              placeholder="Tên khóa học"
              className={s.textField}
              onChange={handleChange}
              value={title}
              name="title"
            />
            <TextField
              label="Mô tả"
              placeholder="Mô tả"
              className={s.textField}
              multiline
              onChange={handleChange}
              value={description}
              name="description"
            />
            <TextField
              label="Học viên sẽ đạt được gì?"
              placeholder="Học viên sẽ đạt được gì?"
              multiline
              className={s.textField}
              onChange={handleChange}
              value={gains}
              name="gains"
            />
            <TextField
              label="Yêu cầu cần có để học khóa học?"
              placeholder="Yêu cầu cần có để học khóa học?"
              multiline
              className={s.textField}
              onChange={handleChange}
              value={requires}
              name="requires"
            />
            <TextField
              label="Slogan khóa học"
              placeholder="As easy like a pie"
              className={s.textField}
              multiline
              onChange={handleChange}
              value={punchLike}
              name="punchLike"
            />
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

CreateCourse.prototype = {
  addCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { addCourse })(CreateCourse)
