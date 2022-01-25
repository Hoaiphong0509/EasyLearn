import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import s from './styles.module.scss'
import cn from 'classnames'

const SectionsList = ({ course, onChangeVideo }) => {
  const { sections } = course

  const [isActive, setIsActive] = useState(false)

  const classVideo = cn({
    [s.active]: true
  })

  return (
    <React.Fragment>
      <List className={s.root}>
        {sections.map((section, index) => (
          <ListItem key={section._id} className={s.itemSections}>
            <ListItem className={s.indexSections}>
              <ListItemIcon>
                <ArrowForwardIosIcon sx={{ color: 'var(--white-1)' }} />
              </ListItemIcon>
              <ListItemText>
                <Typography className={s.titleSections} variant="h5">
                  Section {index + 1}: {section.name}
                </Typography>
              </ListItemText>
            </ListItem>
            <List className={s.itemVideos}>
              {section.videos.map((video) => (
                <ListItem
                  key={video._id}
                  className={s.itemVideos}
                  sx={{ width: '100%' }}
                >
                  <ListItemButton
                    onClick={() => {
                      setIsActive(true)
                      onChangeVideo(video.link)
                    }}
                    className={classVideo}
                    sx={{ width: '100%' }}
                  >
                    <ListItemIcon>
                      <PlayArrowIcon />
                    </ListItemIcon>
                    <ListItemText>{video.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
}

export default SectionsList
