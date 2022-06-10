import React, { useState } from 'react'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeImgBlog, cleanUpBlog } from 'services/redux/actions/blog'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { validateSizeFile } from 'utils/AppUltils'
import { showToast } from 'utils/UIHelper'
import { BLOG_IMG_DEFAULT, TOAST_TYPE } from 'constants/AppConstants'

const ChangeImg = ({ changeImgBlog, cleanUpBlog, blog }) => {
  const [selectedImage, setSelectedImage] = useState()
  const [imgForm, setImgForm] = useState()
  const { t } = useTranslation()
  const history = useHistory()

  const { _id, img } = blog

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
    if (!imgForm) {
      return history.replace(`/blogs/blog_detail/${_id}`)
    }
    await changeImgBlog(_id, imgForm)
    cleanUpBlog()
    return history.replace(`/blogs/blog_detail/${_id}`)
  }

  return (
    <React.Fragment>
      <section className={s.root}>
        <form className={s.form}>
          <Box className={s.imgCourse}>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : (img.length > 0 ? img : BLOG_IMG_DEFAULT)}
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
  changeImgBlog: PropTypes.func.isRequired,
  cleanUpBlog: PropTypes.func.isRequired
}

export default connect(null, { changeImgBlog, cleanUpBlog })(ChangeImg)
