import React, { useState } from 'react'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import TabPanel from 'components/common/TabPanel'
import In4Profile from 'components/EditProfile/In4Profile'

import { connect } from 'react-redux'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import s from './styles.module.scss'
import RegisterCreator from 'components/EditProfile/RegisterCreator'

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const EditProfile = ({ auth: { user } }) => {
  const [value, setValue] = useState(0)

  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box className={s.root}>
      <Grid container>
        <Grid item xs={3} md={3} className={s.tabs}>
          <Box>
            <In4Profile />
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              scrollButtons={false}
              aria-label="scrollable prevent tabs example"
            >
              <Tab label={t('editProfile.general')} />
              <Tab label={t('editProfile.avatar')} />
              <Tab label={t('editProfile.account')} />
              {user.roles.includes(ROLES.CREATOR) ? null : (
                <Tab label={t('editProfile.creator.title')} />
              )}
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={9} md={9} className={s.tabPanel}>
          <TabPanel value={value} index={0}>
            1
          </TabPanel>
          <TabPanel value={value} index={1}>
            2
          </TabPanel>
          <TabPanel value={value} index={2}>
            3
          </TabPanel>
          <TabPanel value={value} index={3}>
            <RegisterCreator />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  )
}

EditProfile.prototype = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(EditProfile)
