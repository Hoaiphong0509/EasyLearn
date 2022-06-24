import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Prompt, useHistory } from 'react-router-dom'

import s from './styles.module.scss'
import Sections from 'components/EditCourse/Sections'

import PropTypes from 'prop-types'

import Spinner from 'react-spinkit'
import { editCourse, getCourse } from 'services/redux/actions/course'
import { connect } from 'react-redux'
import { COURSE_IMG_DEFAULT } from 'constants/AppConstants'
import { useTranslation } from 'react-i18next'
import MyLoading from 'components/common/MyLoading'
const EditCourse = ({
  getCourse,
  editCourse,
  course: { course, loading },
  match
}) => {
  const [isChange, setIsChange] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const history = useHistory()
  const { t } = useTranslation()

  useEffect(() => {
    getCourse(match.params.id)
  }, [getCourse, match.params.id])

  const courseDraft = JSON.parse(localStorage.getItem('courseDraft'))
  const [courseData, setCourseData] = useState(
    courseDraft
      ? {
          title: courseDraft.title,
          description: courseDraft.description,
          punchLike: courseDraft.punchLike,
          gains: courseDraft.gains,
          requires: courseDraft.requires,
          sections: courseDraft.sections
        }
      : {
          title: course.title,
          description: course.description,
          punchLike: course.punchLike,
          gains: course.gains,
          requires: course.requires,
          sections: course.sections
        }
  )

  const { title, description, punchLike, gains, requires } = courseData

  const handleSections = (sections) => {
    setIsChange(true)
    setCourseData({ ...courseData, sections: sections })
  }

  const handleChange = (e) => {
    setIsChange(true)
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
    localStorage.setItem(
      'courseDraft',
      JSON.stringify({ ...courseData, [e.target.name]: e.target.value })
    )
  }

  const handleSubmit = async (e) => {
    setLoadingEdit(true)
    setIsChange(false)
    e.preventDefault()
    localStorage.removeItem('courseDraft')
    await editCourse(course._id, courseData)
    setLoadingEdit(false)
    history.replace(`/courses/course_detail/${course._id}`)
  }

  if (loadingEdit) return <MyLoading />

  return loading || course === null ? (
    <MyLoading />
  ) : (
    <React.Fragment>
      <Prompt when={isChange} message={t('modal.unSaved')} />
      <Box className={s.root}>
        <form className={s.form} onSubmit={handleSubmit}>
          <FormControl className={s.formControlImg}>
            <img
              src={
                course && course.img.length > 0
                  ? course.img
                  : COURSE_IMG_DEFAULT
              }
              alt="img"
            />
          </FormControl>

          <FormControl className={s.formControl}>
            <div className={s.header}>
              <Typography variant="h3" className={s.title}>
                {t('course.createCourse.inforGeneral')}
              </Typography>
            </div>
            <TextField
              label={t('course.createCourse.nameCourse')}
              placeholder={t('course.createCourse.nameCourse')}
              className={s.textField}
              onChange={handleChange}
              value={title}
              name="title"
            />
            <TextField
              label={t('course.createCourse.descCourse')}
              placeholder={t('course.createCourse.descCourse')}
              className={s.textField}
              multiline
              onChange={handleChange}
              value={description}
              name="description"
            />
            <TextField
              label={t('course.createCourse.archiveCourse')}
              placeholder={t('course.createCourse.archiveCourse')}
              className={s.textField}
              onChange={handleChange}
              value={gains}
              name="gains"
            />
            <TextField
              label={t('course.createCourse.reqCourse')}
              placeholder={t('course.createCourse.reqCourse')}
              className={s.textField}
              multiline
              onChange={handleChange}
              value={requires}
              name="requires"
            />
            <TextField
              label={t('course.createCourse.slogan')}
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
                {t('course.createCourse.contentCourse')}
              </Typography>
            </div>
            <Sections
              sectionsCrs={course.sections}
              onSections={handleSections}
            />
          </FormControl>

          <FormControl className={s.footer}>
            <Button type="submit" className={s.buttonSubmit}>
              {t('save')}
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
