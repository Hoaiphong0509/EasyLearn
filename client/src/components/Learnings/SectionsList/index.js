import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import s from './styles.module.scss'

const SectionsList = ({ course, onChangeVideo, onGetVideo, onGetSection }) => {
  const { sections } = course

  const [selectedIndex, setSelectedIndex] = useState(
    course.sections[0].videos[0].link
  )

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }
  return (
    <React.Fragment>
      <List className={s.root}>
        {sections.map((section, index) => (
          <ListItem key={section._id} className={s.itemSections}>
            <Box className={s.indexSections}>
              <ListItemText>
                <Typography className={s.titleSections} variant="h5">
                  Section {index + 1}: {section.name}
                </Typography>
              </ListItemText>
            </Box>
            <Box className={s.itemVideos}>
              {section.videos.map((video, i) => (
                <Box
                  key={video._id}
                  className={s.itemVideos}
                  sx={{ width: '100%' }}
                >
                  <ListItemButton
                    onClick={(event) => {
                      handleListItemClick(event, video._id)
                      onGetVideo(video)
                      onGetSection(section)
                      onChangeVideo(video.link)
                    }}
                    selected={selectedIndex === video._id}
                    sx={{ width: '100%' }}
                  >
                    <ListItemIcon>
                      <PlayArrowIcon />
                    </ListItemIcon>
                    <ListItemText>{video.name}</ListItemText>
                  </ListItemButton>
                </Box>
              ))}
            </Box>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
}

export default SectionsList
