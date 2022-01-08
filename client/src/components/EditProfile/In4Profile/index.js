import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { connect } from 'react-redux'

import s from './styles.module.scss'

const In4Profile = ({ auth: { user } }) => {
  return (
    <Box className={s.root}>
      <img src={user.avatar} alt={user.name} />
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
