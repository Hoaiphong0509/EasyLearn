import React, { useState, useEffect } from 'react'
import {
  Box,
  Divider,
  FormControl,
  TextField,
  Typography,
  Button
} from '@mui/material'
import BannerView from './BannerView'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addBanner,
  changeImgBanner,
  cleanUpBanner
} from 'services/redux/actions/banner'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import s from './styles.module.scss'
import { isRequired, validateSizeFile, validHexColor } from 'utils/AppUltils'
import { showToast } from 'utils/UIHelper'
import { TOAST_TYPE } from 'constants/AppConstants'
import SendIcon from '@mui/icons-material/Send'
import ImageIcon from '@mui/icons-material/Image'
import SaveAltIcon from '@mui/icons-material/SaveAlt'

const CreateBanner = ({
  banner: { banner },
  addBanner,
  changeImgBanner,
  cleanUpBanner
}) => {
  const [newBanner, setNewBanner] = useState()
  const [imgForm, setImgForm] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [isSubmitedDataBanner, setIsSubmitedDataBanner] = useState()
  const [formData, setFormData] = useState({
    titleVi: '',
    titleEn: '',
    descVi: '',
    descEn: '',
    link: '',
    color1: '#487a9d',
    color2: '#a7d8dc'
  })

  const history = useHistory()
  const bn = useSelector((state) => state.banner)

  useEffect(() => {
    if (bn && bn.banner) setNewBanner(bn.banner)
  }, [bn])

  const { titleVi, titleEn, descVi, descEn, link, color1, color2 } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("ALO");
    setIsSubmitedDataBanner(true)
    addBanner(formData)
  }
  const handleSaveImage = async () => {
    await changeImgBanner(newBanner._id, imgForm)
    cleanUpBanner()
    return history.replace(`/admin/banner`)
  }


  return (
    <Box className={s.root}>
      <Box className={s.boxForm}>
        <Typography variant='h2'>TẠO BANNER</Typography>
        <form className={s.form} onSubmit={handleSubmit}>
          <FormControl className={s.formControl}>
            <TextField
              className={s.textField}
              label="Title vi"
              placeholder="Title vietnamese"
              name="titleVi"
              value={titleVi}
              onChange={handleChange}
            />
            <TextField
              className={s.textField}
              label="Title en"
              placeholder="Title english"
              name="titleEn"
              value={titleEn}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              className={s.textField}
              label="Description vi"
              placeholder="Description vietnamese"
              multiline
              name="descVi"
              value={descVi}
              onChange={handleChange}
            />
            <TextField
              className={s.textField}
              label="Description en"
              placeholder="Description english"
              multiline
              name="descEn"
              value={descEn}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              className={s.textField}
              label="Background color 1"
              placeholder="HEX COLOR ONLY! EX: #000000"
              name="color1"
              value={color1}
              onChange={handleChange}
            />
            <TextField
              className={s.textField}
              label="Background color 2"
              placeholder="HEX COLOR ONLY!  EX: #000000"
              name="color2"
              value={color2}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={s.formControl}>
            <TextField
              className={s.textField}
              label="Link"
              placeholder="Link"
              name="link"
              value={link}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ width: 'auto', height: '100%' }}
              endIcon={<SendIcon />}
              disabled={
                (isSubmitedDataBanner && isSubmitedDataBanner) ||
                !(
                  isRequired(formData.titleVi) &&
                  isRequired(formData.titleEn) &&
                  isRequired(formData.descVi) &&
                  isRequired(formData.descEn) &&
                  isRequired(formData.descEn) &&
                  isRequired(formData.color1) &&
                  isRequired(formData.color2) &&
                  validHexColor(formData.color1) &&
                  validHexColor(formData.color2) &&
                  isRequired(formData.link)
                )
              }
            >
              Lưu nội dung banner
            </Button>
          </FormControl>
          <FormControl></FormControl>
        </form>
        <form style={{ margin: '20px 0' }}>
          <Button
            variant="contained"
            component="label"
            className={s.btnSave}
            sx={{ marginRight: '30px' }}
            disabled={newBanner === undefined || newBanner === null}
            endIcon={<ImageIcon />}
          >
            Chọn hình ảnh
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
            className={s.btnSave}
            onClick={handleSaveImage}
            disabled={imgForm === undefined || imgForm === null}
            color="success"
            endIcon={<SaveAltIcon />}
          >
            Lưu banner
          </Button>
        </form>
      </Box>
      <Divider />
      <Box className={s.boxView}>
        <BannerView banner={formData} image={selectedImage} />
      </Box>
    </Box>
  )
}

CreateBanner.prototype = {
  addBanner: PropTypes.func.isRequired,
  changeImgBanner: PropTypes.func.isRequired,
  cleanUpBanner: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  banner: state.banner
})

export default connect(mapStateToProps, {
  addBanner,
  changeImgBanner,
  cleanUpBanner
})(CreateBanner)
