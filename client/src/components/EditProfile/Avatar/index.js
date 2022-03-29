import React, { useState } from 'react'

import s from './styles.module.scss'
import cn from 'classnames'
import useStyles from './useStyles'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@mui/material'

import { changeAvatar } from 'services/redux/actions/user'
import { AVATAR_DEFAULT } from 'constants/AppConstants'

const Avatar = ({ auth: { user } }) => {
  const [selectedImage, setSelectedImage] = useState()
  const c = useStyles()

  const imageChange = async (e) => {
    const uploadForm = new FormData()
    uploadForm.append('avatar', e.target.files[0])
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      changeAvatar(uploadForm)
    }
  }

  return (
    <React.Fragment>
      <section className={cn(s.root, c.root)}>
        <form className={s.form}>
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : user.avatar
                ? user.avatar
                : AVATAR_DEFAULT
            }
            alt="avatar"
          />
          <Button variant="contained" component="label" className={s.file}>
            Save avatar
            <input
              accept="image/*"
              type="file"
              name="avatar"
              hidden
              onChange={imageChange}
            />
          </Button>
        </form>
      </section>
    </React.Fragment>
  )
}

Avatar.propTypes = {
  auth: PropTypes.object.isRequired,
  changeAvatar: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { changeAvatar })(Avatar)
