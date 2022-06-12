import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRequestCreator } from 'services/redux/actions/moderator'

import { Box, Typography } from '@mui/material'

import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import AvatarTableCell from 'components/Admin/common/TableGrid/AvatarTableCell'
import EyeLink from 'components/Admin/common/TableGrid/EyeLink'
import s from './styles.module.scss'
import moment from 'moment'

const Creator = ({ getRequestCreator, request: { requests, loading } }) => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataRef, setRowDataRef] = useState([])

  useEffect(() => {
    getRequestCreator()
  }, [getRequestCreator])

  useEffect(() => {
    setColumnDefs([
      { field: 'name', minWidth: 150 },
      { field: 'content', minWidth: 650 },
      { field: 'email', minWidth: 150 },
      {
        field: 'avatar',
        width: 120,
        cellRenderer: ({ value }) => AvatarTableCell(value)
      },
      { field: 'date', minWidth: 150 },
      {
        field: '_id',
        headerName: '',
        cellRenderer: ({ value }) => EyeLink(`/admin/creator/request_creator/${value}`)
      }
    ])

    setRowDataRef(
      requests.map(({ _id, content, author, date, ...rest }) => {
        return {
          ...rest,
          _id,
          name: author.name,
          content,
          email: author.email,
          avatar: author.avatar,
          date: moment(date).format('DD-MM-YYYY')
        }
      })
    )
  }, [requests])

  return (
    <Box className={s.root}>
      <Typography className={s.title} variant="h3">
        Yêu cầu trở thành cộng tác viên (Creator)
      </Typography>
      {loading || requests === null ? (
        <Spinner name="cube-grid" color="aqua" />
      ) : (
        <Box className={s.table}>
          <TableGrid rowDataRef={rowDataRef} columnDataRef={columnDefs} />
        </Box>
      )}
    </Box>
  )
}

Creator.prototype = {
  getRequestCreator: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request
})

export default connect(mapStateToProps, { getRequestCreator })(Creator)
