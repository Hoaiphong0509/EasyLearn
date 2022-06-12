import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import ToolBar from 'components/Admin/common/ToolBar'
import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import s from './styles.module.scss'
import EyeATag from 'components/Admin/common/TableGrid/EyeATag'
import { API_GET_COMMITS } from 'constants/AppConstants'
import moment from 'moment'
import axios from 'axios'

const ReportUpdatePage = () => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataRef, setRowDataRef] = useState([])
  const [loading, setLoading] = useState(true)
  const [commits, setCommits] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await (await axios.get(API_GET_COMMITS)).data
        setCommits(response)
      } catch (error) {
        console.error(error.message)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setColumnDefs([
      { field: 'author', minWidth: 250 },
      { field: 'message', minWidth: 550 },
      { field: 'date', minWidth: 150 },
      {
        field: 'repo',
        headerName: '',
        cellRenderer: ({ value }) => EyeATag(value)
      }
    ])

    setRowDataRef(
      commits &&
        commits.map(({ sha, commit, html_url }) => {
          return {
            sha,
            author: commit.committer.name,
            message: commit.message,
            date: moment(commit.committer.date).format('DD-MM-YYYY'),
            repo: html_url
          }
        })
    )
  }, [commits])

  const handleGetKeyWord = (keyword) => {
    const temp =
      commits &&
      commits.filter(
        (cmt) =>
          cmt.commit.message.toLowerCase().includes(keyword.toLowerCase()) ||
          cmt.commit.committer.name.toLowerCase().includes(keyword.toLowerCase())
      )
    setRowDataRef(
      temp.map(({ sha, commit, html_url }) => {
        return {
          sha,
          author: commit.committer.name,
          message: commit.message,
          date: moment(commit.committer.date).format('DD-MM-YYYY'),
          repo: html_url
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
            title="Các bản cập nhật"
            placeholder="Tìm bản cập nhật"
            getKeyWord={handleGetKeyWord}
          />
          {loading || commits === null ? (
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

export default ReportUpdatePage
