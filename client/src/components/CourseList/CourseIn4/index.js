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
  Tooltip,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import s from './styles.module.scss'

import { deleteCourse } from 'services/redux/actions/course'
import {
  approveCourse,
  unApproveCourse
} from 'services/redux/actions/moderator'
import { getInTouche } from 'services/redux/actions/profile'

import BlockIcon from '@mui/icons-material/Block'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import ListIcon from '@mui/icons-material/List'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { LINK_EMBED_YOUTUBE, ROLES, TOAST_TYPE } from 'constants/AppConstants'
import PropsTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import {
  cleanUpProfile,
  getCurrentProfile
} from 'services/redux/actions/profile'
import Swal from 'sweetalert2'
import { scrollToTop } from 'utils/AppUltils'
import { showToast } from 'utils/UIHelper'

const CourseIn4 = ({
  auth: { user },
  course,
  getInTouche,
  profile: { profile },
  cleanUpProfile,
  deleteCourse,
  getCurrentProfile,
  approveCourse,
  unApproveCourse
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { t } = useTranslation()
  const history = useHistory()

  const {
    _id,
    user: userCourse,
    title,
    img,
    author,
    description,
    requires,
    sections,
    gains,
    punchLike,
    students,
    status
  } = course

  const [checked, setChecked] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => await getCurrentProfile()
    if (user) fetchProfile()
  }, [getCurrentProfile, user])

  if (profile && students.some((s) => s.user === profile.user)) {
    return <Redirect to={`/learning/${_id}`} />
  }

  const handleAddLearning = async () => {
    if (!user) {
      showToast({ message: t('plsLogin'), type: TOAST_TYPE.WARNING })
      return
    }
    if (profile && students.some((s) => s.user === profile.user)) {
      return
    }

    await getInTouche(_id)
    scrollToTop()
    history.replace(`/learning/${_id}`)
  }

  const handleDeleteCourse = async () => {
    Swal.fire({
      title: t('modal.warnTitle'),
      text: t('modal.deleteCrs'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: t('btnYes'),
      cancelButtonText: t('btnCancle')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCourse(_id)
        history.replace('/my_stuff')
      }
    })
  }

  const handleUnapprovedCourse = async () => {
    Swal.fire({
      title: t('dialogModal.confirmIn4'),
      text: t('dialogModal.unApprovedCrs'),
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: t('btnYes'),
      cancelButtonText: t('btnCancle')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await unApproveCourse(_id)
      }
    })
  }

  const handleApprovedCourse = async () => {
    Swal.fire({
      title: t('dialogModal.confirmIn4'),
      text: t('dialogModal.unApprapprovedCrsovedCrs'),
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: t('btnYes'),
      cancelButtonText: t('btnCancle')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await approveCourse(_id)
      }
    })
  }

  const owner = (
    <Box>
      <Tooltip title="Edit" placement="top-start">
        <IconButton
          color="primary"
          onClick={() => history.push(`/courses/edit_course/${_id}`)}
        >
          <ModeEditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="top-start">
        <IconButton color="primary" onClick={handleDeleteCourse}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Photo" placement="top-start">
        <IconButton
          color="primary"
          onClick={() => history.push(`/courses/add_img/${_id}`)}
        >
          <InsertPhotoIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )

  const moderatorInteraction = (
    <Box sx={{ marginTop: '20px' }}>
      <Button
        variant="contained"
        color="success"
        disabled={course && course.status === 'approved'}
        onClick={() => handleApprovedCourse()}
        startIcon={<CheckCircleIcon />}
      >
        Approved
      </Button>
      <Button
        disabled={course && course.status === 'unapproved'}
        onClick={() => handleUnapprovedCourse()}
        variant="contained"
        color="error"
        startIcon={<BlockIcon />}
      >
        Unapproved
      </Button>
      <IconButton>
        <CheckCircleIcon
          color={`${status === 'approved' ? 'success' : 'disabled'}`}
        />
      </IconButton>
    </Box>
  )

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
            <Link to={`/profile/${userCourse}`} onClick={cleanUpProfile}>
              <div className={s.in4Creator}>
                <Avatar
                  className={s.avt}
                  src={author.avatar}
                  sx={{ width: 68, height: 68 }}
                />
                <Typography className={s.creator}>{author.name}</Typography>
              </div>
            </Link>
          </header>
          <div className={s.box}>
            <Typography className={s.boxTitle} variant="h4">
              {t('course.gains')}
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
              {t('course.required')}
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
                {t('course.content')}
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
                label="M??? t???t c??? n???i dung"
              />
            </Box>
            {sections.map((section, indexSection) => (
              <Box key={section._id}>
                <Typography variant="h5" className={s.sectionName}>
                  {`Section ${indexSection + 1}: `} {section.name}
                </Typography>
                <Box>
                  <Collapse in={checked}>
                    <List>
                      {section.videos &&
                        section.videos.length > 0 &&
                        section.videos.map((video) => (
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
                  {t('course.intro')}
                </Typography>
                {sections &&
                  sections.length > 0 &&
                  sections[0].videos &&
                  sections[0].videos.length > 0 && (
                    <iframe
                      title="description"
                      src={`${LINK_EMBED_YOUTUBE}${sections[0].videos[0].link}`}
                    />
                  )}
              </Box>
            </Modal>
          </header>
          <section className={s.containOverview}>
            <Box className={s.boxBtnGetCourse}>
              <Button onClick={handleAddLearning} className={s.btnGetCourse}>
                {t('course.getInTouch')}
              </Button>
            </Box>

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
                    {sections.length} Sections
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
                    Videos
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
            {user && user._id === userCourse ? owner : null}
            {user &&
            (user.roles.includes(ROLES.ADMIN) ||
              user.roles.includes(ROLES.MODERATOR)) &&
            user._id !== userCourse
              ? moderatorInteraction
              : null}
          </section>
        </Box>
      </Box>
    </React.Fragment>
  )
}

CourseIn4.prototype = {
  auth: PropsTypes.func.isRequired,
  getInTouche: PropsTypes.func.isRequired,
  cleanUpProfile: PropsTypes.func.isRequired,
  deleteCourse: PropsTypes.func.isRequired,
  getCurrentProfile: PropsTypes.func.isRequired,
  approveCourse: PropsTypes.func.isRequired,
  unApproveCourse: PropsTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {
  getInTouche,
  cleanUpProfile,
  deleteCourse,
  getCurrentProfile,
  approveCourse,
  unApproveCourse
})(CourseIn4)
