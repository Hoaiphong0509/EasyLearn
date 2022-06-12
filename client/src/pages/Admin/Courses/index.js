import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCourses } from 'services/redux/actions/course'

import ToolBar from 'components/Admin/common/ToolBar'

import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import AvatarTableCell from 'components/Admin/common/TableGrid/AvatarTableCell'
import ChipCell from 'components/Admin/common/TableGrid/ChipCell'
import EyeLink from 'components/Admin/common/TableGrid/EyeLink'
import s from './styles.module.scss'

const Courses = ({ getCourses, course: { courses, loading } }) => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataRef, setRowDataRef] = useState([])

  useEffect(() => {
    getCourses()
  }, [getCourses])

  useEffect(() => {
    setColumnDefs([
      { field: 'title', minWidth: 650 },
      { field: 'name', minWidth: 150 },
      { field: 'avatar', cellRenderer: ({ value }) => AvatarTableCell(value) },
      { field: 'punchLike' },
      {
        field: 'status',
        minWidth: 80,
        cellRenderer: ({ value }) =>
          value && value === 'unapproved'
            ? ChipCell(value, 'error')
            : ChipCell(value, 'primary')
      },
      {
        field: '_id',
        headerName: '',
        cellRenderer: ({ value }) => EyeLink(`/courses/course_detail/${value}`)
      }
    ])

    setRowDataRef(
      courses.map(({ _id, title, author, status, punchLike, ...rest }) => {
        return {
          ...rest,
          _id,
          title,
          name: author.name,
          avatar: author.avatar,
          status,
          punchLike
        }
      })
    )
  }, [courses])

  const handleGetKeyWord = (keyword) => {
    const temp = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(keyword.toLowerCase()) ||
        course.author.name.toLowerCase().includes(keyword.toLowerCase())
    )
    setRowDataRef(
      temp.map(({ _id, title, author, status, punchLike, ...rest }) => {
        return {
          ...rest,
          _id,
          title,
          name: author.name,
          avatar: author.avatar,
          status,
          punchLike
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
            title="Courses"
            placeholder="Search course"
            getKeyWord={handleGetKeyWord}
          />
          {loading || courses === null ? (
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

Courses.prototype = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getCourses })(Courses)
