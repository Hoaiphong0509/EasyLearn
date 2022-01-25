import React from 'react'

const LearningItem = ({ learning }) => {
  const { _id, title, img, creator, avatar } = learning
  return (
    <React.Fragment>
      <Box className={s.root}>
        <div className={s.content}>
          <img src={img} alt="course_img" />
          <Typography className={s.title} variant="h4">
            {title}
          </Typography>
        </div>
        <div className={s.footer}>
          <img src={avatar} alt="avt_creator" />
          <Typography className={s.creator} variant="p">
            {creator}
          </Typography>
        </div>
      </Box>
    </React.Fragment>
  )
}

export default LearningItem
