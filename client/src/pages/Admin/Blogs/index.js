import React, { useEffect, useState } from 'react'
import { Box, Container} from '@mui/material'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBlogs } from 'services/redux/actions/blog'

import ToolBar from 'components/Admin/common/ToolBar'

import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import AvatarTableCell from 'components/Admin/common/TableGrid/AvatarTableCell'
import ChipCell from 'components/Admin/common/TableGrid/ChipCell'
import EyeLink from 'components/Admin/common/TableGrid/EyeLink'
import s from './styles.module.scss'

const Blogs = ({ getBlogs, blog: { blogs, loading } }) => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataRef, setRowDataRef] = useState([])

  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  useEffect(() => {
    setColumnDefs([
      { field: 'title', minWidth: 650 },
      { field: 'name', minWidth: 150 },
      {
        field: 'avatar',
        width: 120,
        cellRenderer: ({ value }) => AvatarTableCell(value)
      },
      { field: 'likes', width: 120 },
      { field: 'comments', width: 120 },
      {
        field: 'status',
        width: 120,
        cellRenderer: ({ value }) =>
          value && value === 'unapproved'
            ? ChipCell(value, 'error')
            : ChipCell(value, 'primary')
      },
      {
        field: '_id',
        headerName: '',
        cellRenderer: ({ value }) => EyeLink(`/admin/blog/${value}`)
      }
    ])

    setRowDataRef(
      blogs.map(({ title, author, status, likes, comments, ...rest }) => {
        return {
          ...rest,
          title,
          status,
          name: author.name,
          avatar: author.avatar,
          likes: likes.length,
          comments: comments.length
        }
      })
    )
  }, [blogs])

  const handleGetKeyWord = (keyword) => {
    const temp = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(keyword) ||
        blog.author.name.toLowerCase().includes(keyword)
    )
    setRowDataRef(
      temp.map(({ _id, title, author, status, likes, comments, ...rest }) => {
        return {
          ...rest,
          _id,
          title,
          status,
          name: author.name,
          avatar: author.avatar,
          likes: likes.length,
          comments: comments.length
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
            title="Blogs"
            placeholder="Search blog"
            getKeyWord={handleGetKeyWord}
          />
          {loading || blogs === null ? (
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

Blogs.prototype = {
  getBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlogs })(Blogs)
