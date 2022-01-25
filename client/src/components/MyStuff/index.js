import { Box, Tab, Tabs, Typography } from '@mui/material'
import TabPanel from 'components/common/TabPanel'
import React, { useState } from 'react'
import MyBlogsList from './MyBlogsList'
import MyLearnings from './MyLearnings'

import { useTranslation } from 'react-i18next'

import s from './styles.module.scss'
import BlogsList from 'components/BlogsList'

const MyStuff = ({ blogs, user }) => {
  const { learnings } = user

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
          </Box>
        </section>
      </Box>
    </React.Fragment>
  )
}

export default MyStuff
