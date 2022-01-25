import {
  Avatar,
  Box,
  Button,
  Collapse,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Switch,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

import s from './styles.module.scss'

import CheckIcon from '@mui/icons-material/Check'
import CircleIcon from '@mui/icons-material/Circle'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ListIcon from '@mui/icons-material/List'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'

import { getInTouche } from 'services/redux/actions/user'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LINK_EMBED_YOUTUBE } from 'constants/AppConstants'

import { cleanUpProfile } from 'services/redux/actions/profile'

const CourseIn4 = ({ course, getInTouche, auth: { user }, cleanUpProfile }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    _id,
    title,
    img,
    creator,
    avatar,
    description,
    requires,
    sections,
    gains,
    punchLike,
    prices
  } = course
  const [codeVideo, setCodeVideo] = useState('')

  const [checked, setChecked] = useState(true)

  if (user && user.learnings.some((l) => l.learning == _id)) {
    return <Redirect to={`/learning/${_id}`} />
  }

  return (
    <React.Fragment>
      <Box className={s.root}>
        <section className={s.in4Course}>
          <header className={s.header}>
            <Typography className={s.title} variant="h3">
              {title}
            </Typography>
            <Typography className={s.desc} variant="h5">
              {description}
            </Typography>
            {user && (
              <Link to={`/profile/${user._id}`} onClick={cleanUpProfile}>
                <div className={s.in4Creator}>
                  <Avatar
                    className={s.avt}
                    src={avatar}
                    sx={{ width: 68, height: 68 }}
                  />
                  <Typography className={s.creator}>{creator}</Typography>
                </div>
              </Link>
            )}
          </header>
          <div className={s.box}>
            <Typography className={s.boxTitle} variant="h4">
              Bạn sẽ học được gì?
            </Typography>
            <List className={s.list}>
              {gains.map((gain, index) => (
                <ListItem key={index}>
                  <ListItemIcon className={s.listItemIcon}>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText className={s.listItemText}>
                    <Typography className={s.gainText} variant="p">
                      {gain}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={s.box}>
            <Typography className={s.boxTitle} variant="h4">
              Yêu cầu
            </Typography>
            <List className={s.list}>
              {requires.map((require, index) => (
                <ListItem key={index}>
                  <ListItemIcon className={s.listItemIcon}>
                    <CircleIcon color="error" />
                  </ListItemIcon>
                  <ListItemText className={s.listItemText}>
                    <Typography className={s.gainText} variant="p">
                      {require}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={s.box}>
            <Box className={s.boxTitle}>
              <Typography className={s.title} variant="h4">
                Nội dung khóa học
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={(e) => {
                      setChecked(!checked)
                    }}
                  />
                }
                label="Mở tất cả nội dung"
              />
            </Box>
            {sections.map((section, indexSection) => (
              <Box key={section._id}>
                {/* TODO OPEN EACH COURSE */}
                {/* <FormControlLabel
                  control={
                    <Switch
                      // checked={section.isExpanse}
                      onChange={(e) => {
                        section.isExpanse = e.target.checked
                        console.log(section)
                      }}
                    />
                  }
                  label={section.name}
                /> */}
                <Typography variant="h5" className={s.sectionName}>
                  {`Section ${indexSection + 1}: `} {section.name}
                </Typography>
                <Box>
                  <Collapse in={checked}>
                    <List>
                      {section.videos.map((video) => (
                        <ListItem key={video._id}>
                          <ListItemIcon>
                            <PlayCircleFilledWhiteIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography>{video.name}</Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              </Box>
            ))}
          </div>
        </section>
        <Box className={s.overviewCourse}>
          <header className={s.headerOverview}>
            <img src={img} alt="img_course" />
            <IconButton className={s.playIntro} onClick={handleOpen}>
              <PlayCircleFilledWhiteIcon sx={{ fontSize: 80 }} />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
              <Box className={s.videoIntro}>
                <Typography
                  id="modal-modal-title"
                  className={s.introTitle}
                  variant="h5"
                >
                  Introduction Course
                </Typography>
                <iframe
                  src={`${LINK_EMBED_YOUTUBE}${sections[0].videos[0].link}`}
                />
              </Box>
            </Modal>
          </header>
          <section className={s.containOverview}>
            <Typography className={s.prices} variant="h5">
              Miễn Phí
            </Typography>
            <Button onClick={() => getInTouche(_id)} className={s.btnGetCourse}>
              Get in touch
            </Button>
            <List className={s.quickIn4}>
              <ListItem>
                <ListItemIcon>
                  <FormatQuoteIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="p">{punchLike}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="p">
                    {sections.length} sections
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <OndemandVideoIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="p">
                    {sections.reduce(
                      (previous, current) => previous + current.videos.length,
                      0
                    )}{' '}
                    videos
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </section>
        </Box>
      </Box>
    </React.Fragment>
  )
}

CourseIn4.prototype = {
  getInTouche: PropsTypes.func.isRequired,
  auth: PropsTypes.func.isRequired,
  cleanUpProfile: PropsTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { getInTouche, cleanUpProfile })(
  CourseIn4
)
