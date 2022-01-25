import { Box, Grid } from '@mui/material'
import BlogItem from 'components/BlogsList/BlogItem'
import React from 'react'
import { Link } from 'react-router-dom'

import s from './styles.module.scss'

const MyBlogsList = ({ blogs }) => {
  return (
    <React.Fragment>
      <Box className={s.root}>
        <Grid container spacing={4}>
          {blogs &&
            blogs.map((blog) => (
              <Link to="" key={blog._id}>
                <Grid md={3}>
                  <BlogItem blog={blog} />
                </Grid>
              </Link>
            ))}
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default MyBlogsList
