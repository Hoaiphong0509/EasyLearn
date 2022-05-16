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
import { useTranslation } from 'react-i18next'

const CreateCourse = ({ addCourse }) => {
  const history = useHistory()
  const [isChange, setIsChange] = useState(false)
  const { t } = useTranslation()

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
          title: '',
          description: '',
          punchLike: '',
          gains: '',
          requires: '',
          sections: []
        }
  )

  const handleSections = (sections) => {
    setCourseData({ ...courseData, sections: sections })
  }

  const crs = useSelector((state) => state.course)

  useEffect(() => {
    console.log('new course: ', crs)

    if (crs && crs.course) history.push(`/courses/add_img/${crs.course._id}`)
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
      localStorage.removeItem('courseDraft')
      addCourse(courseData)
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <Prompt when={isChange} message={t('modal.unSaved')} />
      <Box className={s.root}>
        <form className={s.form} onSubmit={handleSubmit}>
          <FormControl className={s.formControlImg}>
            <img src={COURSE_IMG_DEFAULT} alt="img" />
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
              multiline
              className={s.textField}
              onChange={handleChange}
              value={gains}
              name="gains"
            />
            <TextField
              label={t('course.createCourse.reqCourse')}
              placeholder={t('course.createCourse.reqCourse')}
              multiline
              className={s.textField}
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
              onSections={handleSections}
              sectionsCrs={courseData.sections}
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

CreateCourse.prototype = {
  addCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { addCourse })(CreateCourse)
