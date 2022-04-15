import React, { useEffect, useState } from 'react'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import TabPanel from 'components/common/TabPanel/TabPanel'
import In4Profile from 'components/EditProfile/In4Profile'

import { connect } from 'react-redux'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import { getCurrentProfile } from 'services/redux/actions/profile'

import { useTranslation } from 'react-i18next'
import s from './styles.module.scss'
import RegisterCreator from 'components/EditProfile/RegisterCreator'
import General from 'components/EditProfile/General'
import Account from 'components/EditProfile/Account'
import Experience from 'components/EditProfile/Experience'
import Education from 'components/EditProfile/Education'

const EditProfile = ({
  auth: { user },
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  // useEffect(() => {
  //   getCurrentProfile()
  // }, [getCurrentProfile, profile, user])

  const [value, setValue] = useState(0)

  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box className={s.root}>
      <Grid container>
        <Grid item xs={3} md={3} className={s.tabs}>
          <Box className={s.boxTabs}>
            {user && profile && <In4Profile user={user} profile={profile} />}
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              scrollButtons={false}
            >
              <Tab label={t('editProfile.account.title')} />
              <Tab label={t('editProfile.general.title')} />
              {user.roles.includes(ROLES.CREATOR) ? (
                <Tab label={t('editProfile.experience.title')} />
              ) : null}
              {user.roles.includes(ROLES.CREATOR) ? (
                <Tab label={t('editProfile.education.title')} />
              ) : null}
              {user.roles.includes(ROLES.CREATOR) ? null : (
                <Tab label={t('editProfile.creator.title')} />
              )}
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={9} md={9} className={s.tabPanel}>
          <TabPanel value={value} index={0}>
            <Box className={s.boxPanel}>
              <header className={s.header}>
                <Typography className={s.title} variant="h3">
                  {t('editProfile.account.title')}
                </Typography>
                <Typography className={s.decs} variant="p">
                  {t('editProfile.account.desc')}
                </Typography>
              </header>
              {user && <Account user={user} />}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={s.boxPanel}>
              <header className={s.header}>
                <Typography className={s.title} variant="h3">
                  {t('editProfile.general.title')}
                </Typography>
                <Typography className={s.decs} variant="p">
                  {t('editProfile.general.desc')}
                </Typography>
              </header>
              {user && profile && <General user={user} profile={profile} />}
            </Box>
          </TabPanel>
          {user.roles.includes(ROLES.CREATOR) ? (
            <TabPanel value={value} index={2}>
              <Box className={s.boxPanel}>
                <header className={s.header}>
                  <Typography className={s.title} variant="h3">
                    {t('editProfile.experience.title')}
                  </Typography>
                  <Typography className={s.decs} variant="p">
                    {t('editProfile.experience.desc')}
                  </Typography>
                </header>
                {user && profile && (
                  <Experience user={user} profile={profile} />
                )}
              </Box>
            </TabPanel>
          ) : null}
          {user.roles.includes(ROLES.CREATOR) ? (
            <TabPanel value={value} index={3}>
              <Box className={s.boxPanel}>
                <header className={s.header}>
                  <Typography className={s.title} variant="h3">
                    {t('editProfile.education.title')}
                  </Typography>
                  <Typography className={s.decs} variant="p">
                    {t('editProfile.education.desc')}
                  </Typography>
                </header>
                {user && profile && <Education user={user} profile={profile} />}
              </Box>
            </TabPanel>
          ) : null}
          {user.roles.includes(ROLES.CREATOR) ? null : (
            <TabPanel value={value} index={2}>
              <Box className={s.boxPanel}>
                <header className={s.header}>
                  <Typography className={s.title} variant="h3">
                    {t('editProfile.creator.title')}
                  </Typography>
                  <Typography className={s.decs} variant="p">
                    {t('editProfile.creator.decs')}
                  </Typography>
                </header>
                <RegisterCreator />
              </Box>
            </TabPanel>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

EditProfile.prototype = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(EditProfile)
