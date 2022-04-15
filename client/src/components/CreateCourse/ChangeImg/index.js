import React, { useState } from 'react'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeImgCourse, cleanUpCourse } from 'services/redux/actions/course'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { validateSizeFile } from 'utils/AppUltils'
import { showToast } from 'utils/UIHelper'
import { TOAST_TYPE } from 'constants/AppConstants'

const ChangeImg = ({ changeImgCourse, cleanUpCourse, course }) => {
  const [selectedImage, setSelectedImage] = useState()
  const [imgForm, setImgForm] = useState()
  const { t } = useTranslation()
  const history = useHistory()

  const { _id, img } = course

  const imageChange = async (e) => {
    if (validateSizeFile(e.target)) {
      showToast({
        message: 'TO BIG',
        type: TOAST_TYPE.ERROR
      })
    } else {
      const uploadForm = new FormData()
      uploadForm.append('img', e.target.files[0])
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0])
        setImgForm(uploadForm)
      }
    }
  }

  const handleContinue = async () => {
    if (!imgForm) return history.replace(`/courses/course_detail/${_id}`)
    await changeImgCourse(_id, imgForm)
    cleanUpCourse()
    return history.replace(`/courses/course_detail/${_id}`)
  }

  return (
    <React.Fragment>
      <section className={s.root}>
        <form className={s.form}>
          <Box className={s.imgCourse}>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : img}
              alt="img"
            />
          </Box>
          <Box className={s.content}>
            <Typography className={s.title} variant="h3">
              {t('course.changeImg.title')}
            </Typography>
            <Typography className={s.desc} variant="p">
              {t('course.changeImg.desc')}
            </Typography>
            <Box className={s.btnBox}>
              <Button
                variant="contained"
                component="label"
                className={s.btnSave}
              >
                {t('course.uploadImg')}
                <input
                  accept="image/*"
                  type="file"
                  name="img"
                  hidden
                  onChange={imageChange}
                />
              </Button>
              <Button
                variant="contained"
                component="label"
                className={s.btnContinue}
                color="error"
                onClick={handleContinue}
              >
                {t('course.continue')}
              </Button>
            </Box>
          </Box>
        </form>
      </section>
    </React.Fragment>
  )
}

ChangeImg.propTypes = {
  changeImgCourse: PropTypes.func.isRequired,
  cleanUpCourse: PropTypes.func.isRequired
}

export default connect(null, { changeImgCourse, cleanUpCourse })(ChangeImg)
