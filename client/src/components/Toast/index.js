import React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Toast = (props) => {
  const { message, type, onClose } = props
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type} elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
