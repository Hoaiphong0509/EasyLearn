import { Box, List, Tab, Tabs, Typography } from '@mui/material'
import TabPanel from 'components/common/TabPanel/TabPanel'
import { LINK_EMBED_YOUTUBE } from 'constants/AppConstants'
import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import Gains from '../Gains'
import Overview from '../Overview'
import Requireds from '../Requireds'
import SectionsList from '../SectionsList'

import s from './styles.module.scss'

const Study = ({ course }) => {
  const [codeLink, setCodeLink] = useState('')
  const [value, setValue] = useState(0)

  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const {
    title,
    img,
    creator,
    avatar,
    description,
    requires,
    gains,
    punchLike,
    sections
  } = course

  const handleChangeVideo = (code) => {
    setCodeLink(code)
  }

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.areaLearn}>
          <section className={s.video}>
            <iframe
              src={`${LINK_EMBED_YOUTUBE}${codeLink}?modestbranding=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen="allowfullscreen"
            />
          </section>
          <section className={s.in4}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
              >
                <Tab label={t('areaStudy.overview')} />
                <Tab label={t('areaStudy.gains')} />
                <Tab label={t('areaStudy.requires')} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box className={s.boxPanel}>
                <Overview course={course} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className={s.boxPanel}>
                <Gains course={course} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box className={s.boxPanel}>
                <Requireds course={course} />
              </Box>
            </TabPanel>
          </section>
        </Box>
        <Box className={s.sections}>
          <SectionsList onChangeVideo={handleChangeVideo} course={course} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Study
