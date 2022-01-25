import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { connect } from 'react-redux'

import s from './styles.module.scss'
import { width } from '@mui/system'

const In4Profile = ({ auth: { user } }) => {
  return (
    <Box className={s.root}>
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{ width: 154, height: 154 }}
      />
      <Typography variant="h4" className={s.name}>
        {user.name}
      </Typography>
    </Box>
  )
}

In4Profile.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(In4Profile)
