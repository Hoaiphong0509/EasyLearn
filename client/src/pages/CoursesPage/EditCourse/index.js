import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import s from './styles.module.scss'
import Sections from 'components/EditCourse/Sections'

import PropTypes from 'prop-types'

import Spinner from 'react-spinkit'
import { editCourse, getCourse } from 'services/redux/actions/course'
import { connect } from 'react-redux'
import { COURSE_IMG_DEFAULT } from 'constants/AppConstants'

const EditCourse = ({
  getCourse,
  editCourse,
  course: { course, loading },
  match
}) => {
  const history = useHistory()

  useEffect(() => {
    getCourse(match.params.id)
  }, [getCourse, match.params.id])

  const [courseData, setCourseData] = useState({
    title: course.title,
    description: course.description,
    punchLike: course.punchLike,
    gains: course.gains,
    requires: course.requires,
    sections: course.sections
  })

  const { title, description, punchLike, gains, requires } = courseData

  const handleSections = (sections) => {
    setCourseData({ ...courseData, sections: sections })
  }

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await editCourse(course._id, courseData)
    history.replace(`/courses/course_detail/${course._id}`)
  }
  return loading || course === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <Box className={s.root}>
        <form className={s.form} onSubmit={handleSubmit}>
          <FormControl className={s.formControlImg}>
            <img src={course ? course.img : COURSE_IMG_DEFAULT} alt="img" />
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
              className={s.textField}
              onChange={handleChange}
              value={gains}
              name="gains"
            />
            <TextField
              label="Yêu cầu cần có để học khóa học?"
              placeholder="Yêu cầu cần có để học khóa học?"
              className={s.textField}
              multiline
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
              sectionsCrs={course.sections}
              onSections={handleSections}
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

EditCourse.prototype = {
  getCourse: PropTypes.func.isRequired,
  editCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourse, editCourse })(EditCourse)
