import React, { useEffect, useState } from 'react'
import { Box, Container, Tab, Tabs } from '@mui/material'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from 'services/redux/actions/user'

import TabPanel from 'components/common/TabPanel/TabPanel'
import ToolBar from 'components/Admin/common/ToolBar'

import TableGrid from 'components/Admin/common/TableGrid'
import Spinner from 'react-spinkit'
import AvatarTableCell from 'components/Admin/common/TableGrid/AvatarTableCell'
import ChipCell from 'components/Admin/common/TableGrid/ChipCell'
import EyeLink from 'components/Admin/common/TableGrid/EyeLink'
import { ROLES } from 'constants/AppConstants'
import s from './styles.module.scss'

const Users = ({ getUsers, user: { users, loading } }) => {
  const [value, setValue] = useState(0)
  const [columnDefs, setColumnDefs] = useState([])
  const [rowDataAllRef, setRowDataAllRef] = useState([])
  const [rowDataModeratorRef, setRowDataModeratorRef] = useState([])
  const [rowDataCreatorRef, setRowDataCreatorRef] = useState([])
  const [rowDataStudentRef, setRowDataStudentRef] = useState([])

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

    setRowDataAllRef(
      users.map(({ _id, name, email, avatar, roles }) => {
        return {
          _id,
          name,
          email,
          avatar,
          roles
        }
      })
    )
    setRowDataModeratorRef(
      users.filter(({ roles }) => {
        return roles.includes(ROLES.MODERATOR)
      })
    )
    setRowDataCreatorRef(
      users.filter(({ roles }) => {
        return roles.includes(ROLES.CREATOR)
      })
    )
    setRowDataStudentRef(
      users.filter(({ roles }) => {
        return roles.includes(ROLES.STUDENT)
      })
    )
  }, [users])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleGetKeyWord = (keyword) => {
    const temp = users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase())
    )
    setRowDataAllRef(
      temp.map(({ name, email, avatar, roles }) => {
        return {
          name,
          email,
          avatar,
          roles
        }
      })
    )

    setRowDataModeratorRef(
      temp.filter(({ roles }) => {
        return roles.includes(ROLES.MODERATOR)
      })
    )
    setRowDataCreatorRef(
      temp.filter(({ roles }) => {
        return roles.includes(ROLES.CREATOR)
      })
    )
    setRowDataStudentRef(
      temp.filter(({ roles }) => {
        return roles.includes(ROLES.STUDENT)
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
            title="User"
            placeholder="Search User"
            getKeyWord={handleGetKeyWord}
          />
          {loading || users === null ? (
            <Spinner name="cube-grid" color="aqua" />
          ) : (
            <>
              <Box className={s.tabs}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons={false}
                >
                  <Tab label="All Users" />
                  <Tab label="Moderator" />
                  <Tab label="Creator" />
                  <Tab label="Students" />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Box className={s.boxPanel}>
                  <TableGrid
                    rowDataRef={rowDataAllRef}
                    columnDataRef={columnDefs}
                  />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box className={s.boxPanel}>
                  <TableGrid
                    rowDataRef={rowDataModeratorRef}
                    columnDataRef={columnDefs}
                  />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box className={s.boxPanel}>
                  <TableGrid
                    rowDataRef={rowDataCreatorRef}
                    columnDataRef={columnDefs}
                  />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Box className={s.boxPanel}>
                  <TableGrid
                    rowDataRef={rowDataStudentRef}
                    columnDataRef={columnDefs}
                  />
                </Box>
              </TabPanel>
            </>
          )}
        </Container>
      </Box>
    </>
  )
}

Users.prototype = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { getUsers })(Users)
