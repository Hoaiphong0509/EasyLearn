import React, { useState } from 'react'
import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

import InsertLinkIcon from '@mui/icons-material/InsertLink'

import s from './styles.module.scss'
import VideoForm from '../VideoForm'

const Video = ({ videos, removeVideo, updateVideo }) => {
  const [edit, setEdit] = useState({
    _id: null,
    name: '',
    link: ''
  })

  const submitUpdate = (name, link) => {
    updateVideo(edit._id, name, link)
    setEdit({
      _id: null,
      name: '',
      link: ''
    })
  }

  if (edit._id) {
    return <VideoForm edit={edit} onSubmit={submitUpdate} />
  }

  return videos.map((video, index) => (
    <div className={s.video_row} key={index}>
      <div key={video._id} className={s.videoIn4}>
        <div className={s.in4}>{video.name}</div>
        <InsertLinkIcon />
        <div className={s.in4}>{video.link}</div>
      </div>
      <div className={s.icons}>
        <Button
          className={s.btn}
          color="error"
          variant="outlined"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => removeVideo(video._id)}
        />
        <Button
          className={s.btn}
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() =>
            setEdit({
              _id: video._id,
              name: video.name,
              link: video.link
            })
          }
        />
      </div>
    </div>
  ))
}

export default Video
