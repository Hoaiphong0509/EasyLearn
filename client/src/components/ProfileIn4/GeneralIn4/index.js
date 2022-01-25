import { ArrowForwardIos, Email, PhoneAndroid } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import React from 'react'
import s from './styles.module.scss'
import moment from 'moment'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import TabPanel from 'components/common/TabPanel'
import CourseItemSmall from './CourseItemSmall'
import BlogItemSmall from './BlogItemSmall'

const GeneralIn4 = ({
  name,
  email,
  phone,
  skills,
  bio,
  experience,
  education,
  courses,
  blogs
}) => {
  const [value, setValue] = useState(0)

  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Stack className={s.stack} spacing={2}>
          <Typography className={s.name} variant="h3">
            {name}
          </Typography>
          <Typography className={s.bio} variant="h5">
            {bio}
          </Typography>
          <Box className={s.contactBox}>
            <Typography className={s.contact} variant="h6">
              {t('profile.contact')}
            </Typography>
            <Box className={s.boxItemContact}>
              <PhoneAndroid className={s.icon} fontSize="15px" />
              <Typography className={s.text} variant="p">
                {phone}
              </Typography>
            </Box>
            <Box className={s.boxItemContact}>
              <Email className={s.icon} fontSize="15px" />
              <Typography className={s.text} variant="p">
                {email}
              </Typography>
            </Box>
          </Box>
          <Box className={s.skillsBox}>
            <Typography className={s.contact} variant="h6">
              {t('profile.skills')}
            </Typography>
            {skills.map((skill, index) => (
              <Chip className={s.skill} key={index} label={skill} />
            ))}
          </Box>
          <Divider />
          <Box className={s.expBox}>
            <Typography className={s.contact} variant="h6">
              {t('profile.exp')}
            </Typography>
            {experience.map((exp) => (
              <Card key={exp._id} className={s.card}>
                <CardContent className={s.cardContent}>
                  <Typography className={s.title} variant="h5">
                    {exp.title}
                  </Typography>
                  <Typography className={s.company} variant="h6">
                    {exp.company}
                  </Typography>
                  <Typography className={s.location} variant="h6">
                    {exp.location}
                  </Typography>
                  <Stack
                    display="flex"
                    direction="row"
                    spacing={2}
                    className={s.stack}
                  >
                    <Typography className={s.from}>
                      {moment(exp.from).format('l')}
                    </Typography>
                    <ArrowForwardIos className={s.arrow} />
                    <Typography className={s.to}>
                      {exp.current ? 'current' : moment(exp.to).format('l')}
                    </Typography>
                  </Stack>
                  <Typography variant="p" className={s.desc}>
                    {exp.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Divider />
          <Box className={s.eduBox}>
            <Typography className={s.contact} variant="h6">
              {t('profile.edu')}
            </Typography>
            {education.map((edu) => (
              <Card className={s.card} key={edu._id}>
                <CardContent className={s.cardContent}>
                  <Typography className={s.school} variant="h5">
                    {edu.school}
                  </Typography>
                  <Typography className={s.degree} variant="h6">
                    {edu.degree}
                  </Typography>
                  <Typography className={s.fieldofstudy} variant="h6">
                    {edu.fieldofstudy}
                  </Typography>
                  <Stack
                    display="flex"
                    direction="row"
                    spacing={2}
                    className={s.stack}
                  >
                    <Typography className={s.from}>
                      {moment(edu.from).format('l')}
                    </Typography>
                    <ArrowForwardIos className={s.arrow} />
                    <Typography className={s.to}>
                      {edu.current ? 'current' : moment(edu.to).format('l')}
                    </Typography>
                  </Stack>
                  <Typography variant="p" className={s.desc}>
                    {edu.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Divider />
          <Box className={s.contentBox}>
            <Typography className={s.contact} variant="h6">
              {t('profile.content')}
            </Typography>
            <Box className={s.tabsBox}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
              >
                <Tab label={t('profile.courses')} />
                <Tab label={t('profile.blogs')} />
              </Tabs>
              <Box className={s.tabPanelStuff}>
                <TabPanel value={value} index={0}>
                  <Box className={s.boxPanel}>
                    <Grid container spacing={1}>
                      {courses &&
                        courses.map((course) => (
                          <Grid item md={4} key={course._id}>
                            <CourseItemSmall course={course} />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box className={s.boxPanel}>
                    {blogs &&
                      blogs.map((blog) => (
                        <BlogItemSmall key={blog._id} blog={blog} />
                      ))}
                  </Box>
                </TabPanel>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  )
}

export default GeneralIn4
