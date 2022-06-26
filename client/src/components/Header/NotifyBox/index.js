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
import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { LoadingButton } from '@mui/lab'
import cookies from 'js-cookie'
import { deleteNotify, getMyNotifies } from 'services/redux/actions/notify'
import s from './styles.module.scss'

const NotifyBox = ({
  getMyNotifies,
  deleteNotify,
  notify: { notifies, loading }
}) => {
  useEffect(() => {
    const fetchNotify = async () => {
      await getMyNotifies()
    }
    fetchNotify()
  }, [getMyNotifies])

  const { t } = useTranslation()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const currentLanguageCode =
    (cookies.get('i18next') && cookies.get('i18next')) || 'vi'
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return loading || notifies === null ? (
    <LoadingButton />
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
        className={s.menu}
      >
        <Box className={s.boxNotifies} sx={{ padding: '10px', width: '650px' }}>
          <MenuList className={s.menuList}>
            {notifies && notifies.length > 0 ? (
              notifies.map((notify) => (
                <Box key={notify._id} className={s.boxNotify}>
                  <MenuItem className={s.menuItem}>
                    <Tooltip
                      arrow={true}
                      title={
                        currentLanguageCode === 'vi'
                          ? notify.textVi
                          : notify.textEn
                      }
                    >
                      <Typography className={s.notify} noWrap={false}>
                        {currentLanguageCode === 'vi'
                          ? notify.textVi
                          : notify.textEn}
                      </Typography>
                    </Tooltip>

                    <Tooltip title="Xóa thông báo này">
                      <IconButton
                        className={s.btnRemove}
                        onClick={() => deleteNotify(notify._id)}
                      >
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
