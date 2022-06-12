import { Box } from '@mui/material'
import React from 'react'
import GeneralIn4 from './GeneralIn4'
import GaravatarAndIn4 from './GravatarAndIn4'

import s from './styles.module.scss'

const ProfileIn4 = ({ profile, courses, blogs }) => {
  const { knowAs, skills, bio, experience, education, social, user } = profile

  return (
    <Box className={s.root}>
      <Box className={s.container}>
        <Box className={s.in4}>
          <GeneralIn4
            name={knowAs}
            skills={skills}
            bio={bio}
            experience={experience}
            education={education}
            courses={courses}
            blogs={blogs}
          />
        </Box>
        <Box className={s.gravatar}>
          <GaravatarAndIn4
            numberCourses={courses.length}
            numberBlogs={blogs.length}
            social={social}
            avatar={user.avatar}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileIn4
