import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import axios from 'axios'
import Spinner from 'react-spinkit'
import { API_GET_COMMITS } from 'constants/AppConstants'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ReportUpdate = (props) => {
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

  console.log('commits', commits)
  return loading || commits === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <Card {...props}>
      <CardHeader title="Các bản cập nhật" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tác giả</TableCell>
              <TableCell>Nội dung cập nhật</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel direction="desc">Ngày</TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commits.map((cmt, index) => {
              const { commit } = cmt
              const { committer, message } = commit
              if (index <= 7) {
                return (
                  <TableRow hover key={cmt.sha}>
                    <TableCell>{committer.name}</TableCell>
                    <TableCell>{message}</TableCell>
                    <TableCell>
                      {moment(committer.date).format('DD-MM-YYYY')}
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Link to="/admin/dashboard/report_commits">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            Xem tất cả
          </Button>
        </Link>
      </Box>
    </Card>
  )
}

export default ReportUpdate
