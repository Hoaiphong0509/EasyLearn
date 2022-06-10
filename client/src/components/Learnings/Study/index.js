import React, { useState } from 'react'
import TabPanel from 'components/common/TabPanel/TabPanel'
import { LINK_EMBED_YOUTUBE, ROLES } from 'constants/AppConstants'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import Comments from '../Comments'
import Gains from '../Gains'
import Overview from '../Overview'
import Requireds from '../Requireds'
import SectionsList from '../SectionsList'

import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Tooltip
} from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import SettingsIcon from '@mui/icons-material/Settings'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BlockIcon from '@mui/icons-material/Block'

import { deleteCourse } from 'services/redux/actions/course'
import {
  approveCourse,
  unApproveCourse
} from 'services/redux/actions/moderator'

import s from './styles.module.scss'
import ConfirmDialog from 'components/ConfirmDialog'

const Study = ({
  auth: { user },
  course,
  deleteCourse,
  approveCourse,
  unApproveCourse
}) => {
  const { _id, user: userCourse } = course

  const [confirmOpen, setConfirmOpen] = useState(false)

  const [codeLink, setCodeLink] = useState(course.sections[0].videos[0].link)
  const [videoforCmt, setVideoforCmt] = useState(course.sections[0].videos[0])
  const [sectionforCmt, setSectionforCmt] = useState(course.sections[0])
  const [value, setValue] = useState(0)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const openSetting = Boolean(anchorEl)
  const handleOpenSetting = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { t } = useTranslation()
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeVideo = (code) => {
    setCodeLink(code)
  }

  const handleGetVideo = (video) => {
    setVideoforCmt(video)
  }
  const handleGetSection = (section) => {
    setSectionforCmt(section)
  }

  const owner = (
    <Box>
      <Badge className={s.icon} color="primary">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={openSetting ? 'long-menu' : undefined}
          aria-expanded={openSetting ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleOpenSetting}
        >
          <SettingsIcon sx={{ fontSize: 40 }} color="primary" />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          anchorEl={anchorEl}
          open={openSetting}
          onClose={handleClose}
        >
          <MenuItem onClick={() => history.push(`/courses/edit_course/${_id}`)}>
            <Tooltip title="Edit" placement="top-start">
              <IconButton color="primary">
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={() => setConfirmOpen(true)}>
            <Tooltip title="Delete" placement="top-start">
              <IconButton color="primary">
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={() => history.push(`/courses/add_img/${_id}`)}>
            <Tooltip title="Photo" placement="top-start">
              <IconButton color="primary">
                <InsertPhotoIcon />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </Menu>
      </Badge>
    </Box>
  )

  const moderatorInteraction = (
    <Box sx={{ marginTop: '9px' }}>
      <Button
        variant="contained"
        color="success"
        disabled={course && course.status === 'approved'}
        onClick={() => approveCourse(_id)}
        startIcon={<CheckCircleIcon />}
      >
        Approved
      </Button>
      <Button
        variant="contained"
        color="error"
        disabled={course && course.status === 'unapproved'}
        onClick={() => unApproveCourse(_id)}
        startIcon={<BlockIcon />}
      >
        Unapproved
      </Button>
    </Box>
  )

  return (
    <React.Fragment>
      <Box className={s.root}>
        <Box className={s.areaLearn}>
          <section className={s.video}>
            <iframe
              title="Study"
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
                <Tab label={t('areaStudy.comments')} />
                {user && user._id === userCourse ? owner : null}
                {user &&
                (user.roles.includes(ROLES.ADMIN) ||
                  user.roles.includes(ROLES.MODERATOR)) &&
                user._id !== userCourse
                  ? moderatorInteraction
                  : null}
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
            <TabPanel value={value} index={3}>
              <Box className={s.boxPanel}>
                <Comments
                  course={course}
                  section={sectionforCmt}
                  video={videoforCmt}
                />
              </Box>
            </TabPanel>
          </section>
        </Box>
        <Box className={s.sections}>
          <SectionsList
            onChangeVideo={handleChangeVideo}
            onGetVideo={handleGetVideo}
            onGetSection={handleGetSection}
            course={course}
          />
        </Box>
        <ConfirmDialog
          title="Delete course?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={async () => {
            await deleteCourse(_id)
            history.replace('/my_stuff')
          }}
        >
          Are you sure you want to delete this course?
        </ConfirmDialog>
      </Box>
    </React.Fragment>
  )
}

Study.prototype = {
  auth: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  approveCourse: PropTypes.func.isRequired,
  unApproveCourse: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  deleteCourse,
  approveCourse,
  unApproveCourse
})(Study)
