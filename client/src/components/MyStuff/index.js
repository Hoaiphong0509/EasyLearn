import { Box, Tab, Tabs, Typography } from '@mui/material'
import TabPanel from 'components/common/TabPanel/TabPanel'
import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'
import { ROLES } from 'constants/AppConstants'
import BlogsList from 'components/BlogsList'
import MyCourses from './MyCourses'
import MyLearnings from './MyLearnings'

const MyStuff = ({ blogs, user, learnings, courses }) => {
  const [value, setValue] = useState(0)

  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.header}>
          <Typography className={s.title} variant="h3">
            {t('myStuff.title')}
          </Typography>
          <Typography className={s.desc} variant="p">
            {t('myStuff.desc')}
          </Typography>
        </Box>
        <section className={s.stuff}>
          <Box className={s.tabStuff}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
            >
              <Tab label={t('myStuff.blogs')} />
              <Tab label={t('myStuff.learnings')} />
              {user.roles.includes(ROLES.CREATOR) ? (
                <Tab label={t('myStuff.courses')} />
              ) : null}
            </Tabs>
          </Box>
          <Box className={s.tabPanelStuff}>
            <TabPanel value={value} index={0}>
              <Box className={s.boxPanel}>
                <BlogsList blogs={blogs} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className={s.boxPanel}>
                <MyLearnings learnings={learnings} />
              </Box>
            </TabPanel>
            {user.roles.includes(ROLES.CREATOR) ? (
              <TabPanel value={value} index={2}>
                <Box className={s.boxPanel}>
                  <MyCourses courses={courses} />
                </Box>
              </TabPanel>
            ) : null}
          </Box>
        </section>
      </Box>
    </React.Fragment>
  )
}

export default MyStuff
