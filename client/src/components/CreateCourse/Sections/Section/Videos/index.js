import React, { useState } from 'react'

import Video from './Video'
import VideoForm from './VideoForm'

function Videos(props) {
  const [videosData, setVideosData] = useState(props.videos ? props.videos : [])

  const addVideo = (video) => {
    if (
      !video.name ||
      (/^\s*$/.test(video.name) && !video.link) ||
      /^\s*$/.test(video.link)
    ) {
      return
    }
    const newVideos = [...videosData, video]

    setVideosData(newVideos)
    props.setVideo(props.index,newVideos)
  }

  const updateVideo = (videoId, newValue) => {
    if (
      !newValue.name ||
      (/^\s*$/.test(newValue.name) && !newValue.link) ||
      /^\s*$/.test(newValue.link)
    ) {
      return
    }

    setVideosData((prev) =>
      prev.map((item) => (item.id === videoId ? newValue : item))
    )
  }

  const removeVideo = (id) => {
    const removedArr = [...props.videos].filter((video) => video.id !== id)

    setVideosData(removedArr)
    props.setVideo(removedArr)
  }

  return (
    <>
      <VideoForm onSubmit={addVideo} />
      <Video
        videos={videosData}
        removeVideo={removeVideo}
        updateVideo={updateVideo}
      />
    </>
  )
}

export default Videos
