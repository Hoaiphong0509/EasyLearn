import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from 'services/redux/actions/user'

import { Box, Typography } from '@mui/material'

import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import AvatarTableCell from 'components/Admin/common/TableGrid/AvatarTableCell'
import ChipCell from 'components/Admin/common/TableGrid/ChipCell'
import EyeLink from 'components/Admin/common/TableGrid/EyeLink'
import FormAddModerator from 'components/Admin/Moderator/FormAddModerator'
import s from './styles.module.scss'
import { ROLES } from 'constants/AppConstants'

const Moderator = ({ auth: { user }, getUsers, user: { users, loading } }) => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataModeratorRef, setRowDataModeratorRef] = useState([])

  useEffect(() => {
    getUsers()
  }, [getUsers])
  useEffect(() => {
    setColumnDefs([
      { field: 'name', minWidth: 350 },
      { field: 'email', minWidth: 450 },
      {
        field: 'avatar',
        cellRenderer: ({ value }) => AvatarTableCell(value)
      },
      {
        field: 'roles',
        minWidth: 450,
        cellRenderer: ({ value }) =>
          value &&
          value.map((v) => {
            switch (v) {
              case ROLES.ADMIN:
                return ChipCell(v, 'error')
              case ROLES.MODERATOR:
                return ChipCell(v, 'warning')
              case ROLES.CREATOR:
                return ChipCell(v, 'secondary')
              default:
                return ChipCell(v, 'primary')
            }
          })
      },
      {
        field: '_id',
        headerName: '',
        cellRenderer: ({ value }) => EyeLink(`/admin/user/${value}`)
      }
    ])

    setRowDataModeratorRef(
      users.filter(({ roles }) => {
        return roles.includes(ROLES.MODERATOR)
      })
    )
  }, [users])

  return (
    <Box className={s.root}>
      <Typography className={s.title} variant="h3">
        Người kiểm duyệt
      </Typography>
      {user && user.roles.includes(ROLES.ADMIN) ? <FormAddModerator /> : null}
      {loading || users === null ? (
        <Spinner name="cube-grid" color="aqua" />
      ) : (
        <Box className={s.table}>
          <TableGrid
            rowDataRef={rowDataModeratorRef}
            columnDataRef={columnDefs}
          />
        </Box>
      )}
    </Box>
  )
}

Moderator.prototype = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
})

export default connect(mapStateToProps, { getUsers })(Moderator)
