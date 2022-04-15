import { Class, Create } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import React from 'react'

import s from './styles.module.scss'

const GravatarAndIn4 = ({ numberCourses, numberBlogs, social, avatar }) => {
  return (
    <React.Fragment>
      <Box className={s.root}>
        <Avatar src={avatar} alt="avatar" sx={{ width: 156, height: 156 }} />
        <Stack className={s.root} display="flex" flexDirection="row">
          <Box className={s.stackItem}>
            <Tooltip title="Course" placement="right" arrow>
              <Class className={s.icon} />
            </Tooltip>
            <Typography className={s.text} variant="p">
              {numberCourses}
            </Typography>
          </Box>
          <Box className={s.stackItem}>
            <Tooltip title="Blogs" placement="right" arrow>
              <Create className={s.icon} />
            </Tooltip>
            <Typography className={s.text} variant="p">
              {numberBlogs}
            </Typography>
          </Box>
        </Stack>
        {social && (
          <List className={s.list}>
            {social.youtube && (
              <ListItem className={s.listItem}>
                <a target="_blank" href={social.youtube}>
                  <Chip className={s.chip} label="Youtube"></Chip>
                </a>
              </ListItem>
            )}
            {social.twitter && (
              <ListItem className={s.listItem}>
                <a target="_blank" href={social.twitter}>
                  <Chip className={s.chip} label="Twitter"></Chip>
                </a>
              </ListItem>
            )}
            {social.facebook && (
              <ListItem className={s.listItem}>
                <a target="_blank" href={social.facebook}>
                  <Chip className={s.chip} label="Facebook"></Chip>
                </a>
              </ListItem>
            )}
            {social.linkedin && (
              <ListItem className={s.listItem}>
                <a target="_blank" href={social.linkedin}>
                  <Chip className={s.chip} label="Linkedin"></Chip>
                </a>
              </ListItem>
            )}
            {social.instagram && (
              <ListItem className={s.listItem}>
                <a target="_blank" href={social.instagram}>
                  <Chip className={s.chip} label="Instagram"></Chip>
                </a>
              </ListItem>
            )}
          </List>
        )}
      </Box>
    </React.Fragment>
  )
}

export default GravatarAndIn4
