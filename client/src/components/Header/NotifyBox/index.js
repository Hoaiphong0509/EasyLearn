import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import cookies from 'js-cookie'
import { getMyNotifies, deleteNotify } from 'services/redux/actions/notify'
import s from './styles.module.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Spinner from 'react-spinkit'

const NotifyBox = ({
  getMyNotifies,
  deleteNotify,
  notify: { notifies, loading }
}) => {
  useEffect(async () => {
    await getMyNotifies()
  }, [])

  const { t } = useTranslation()

  const handleClose = () => {
    setAnchorEl(null)
  }
  const currentLanguageCode =
    (cookies.get('i18next') && cookies.get('i18next')) || 'vi'
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return loading || notifies === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <>
      <Badge badgeContent={notifies.length}>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <NotificationsIcon color="primary" sx={{ fontSize: 32 }} />
        </IconButton>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ marginTop: '15px' }}
      >
        <Box className={s.boxList} sx={{ padding: '10px', width: '650px' }}>
          <MenuList>
            {notifies && notifies.length > 0 ? (
              notifies.map((notify) => (
                <Box key={notify._id}>
                  <MenuItem
                    sx={{
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'var(--dark-blue)',
                        fontWeight: 'bold'
                      }}
                      variant="h5"
                    >
                      {currentLanguageCode === 'vi'
                        ? notify.textVi
                        : notify.textEn}
                    </Typography>
                    <Tooltip title="Xóa thông báo này">
                      <IconButton onClick={() => deleteNotify(notify._id)}>
                        <DeleteForeverIcon
                          color="error"
                          sx={{ fontSize: 32 }}
                        />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                </Box>
              ))
            ) : (
              <Typography>{t('notify.noneNotify')}</Typography>
            )}
          </MenuList>
        </Box>
      </Menu>
    </>
  )
}

NotifyBox.prototype = {
  getMyNotifies: PropTypes.func.isRequired,
  deleteNotify: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  notify: state.notify
})

export default connect(mapStateToProps, { getMyNotifies, deleteNotify })(
  NotifyBox
)
