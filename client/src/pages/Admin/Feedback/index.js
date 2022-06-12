import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getListFeedback } from 'services/redux/actions/moderator'

import ToolBar from 'components/Admin/common/ToolBar'

import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import AvatarTableCell from 'components/Admin/common/TableGrid/AvatarTableCell'
import EyeLink from 'components/Admin/common/TableGrid/EyeLink'
import s from './styles.module.scss'
const Feedback = ({ getListFeedback, feedback: { feedbacks, loading } }) => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataRef, setRowDataRef] = useState([])

  useEffect(() => {
    getListFeedback()
  }, [getListFeedback])

  useEffect(() => {
    setColumnDefs([
      { field: 'title', minWidth: 650 },
      { field: 'date', minWidth: 150 },
      { field: 'email', minWidth: 150 },
      {
        field: 'avatar',
        width: 120,
        cellRenderer: ({ value }) => AvatarTableCell(value)
      },
      {
        field: '_id',
        headerName: '',
        cellRenderer: ({ value }) => EyeLink(`/admin/feedback/${value}`)
      }
    ])

    setRowDataRef(
      feedbacks.map(({ _id, title, author, date, ...rest }) => {
        return {
          ...rest,
          _id,
          title,
          date,
          email: author.email,
          avatar: author.avatar
        }
      })
    )
  }, [feedbacks])

  const handleGetKeyWord = (keyword) => {
    const temp = feedbacks.filter(
      (fb) =>
        fb.title.toLowerCase().includes(keyword.toLowerCase()) ||
        fb.author.email.toLowerCase().includes(keyword.toLowerCase())
    )
    setRowDataRef(
      temp.map(({ _id, title, author, date, ...rest }) => {
        return {
          ...rest,
          _id,
          title,
          date,
          email: author.email,
          avatar: author.avatar
        }
      })
    )
  }

  return (
    <>
      <Box
        className={s.root}
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <ToolBar
            title="Feedbacks"
            placeholder="Search feedback"
            getKeyWord={handleGetKeyWord}
          />
          {loading || feedbacks === null ? (
            <Spinner name="cube-grid" color="aqua" />
          ) : (
            <Box className={s.table}>
              <TableGrid rowDataRef={rowDataRef} columnDataRef={columnDefs} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}

Feedback.prototype = {
  getListFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  feedback: state.feedback
})

export default connect(mapStateToProps, { getListFeedback })(Feedback)
