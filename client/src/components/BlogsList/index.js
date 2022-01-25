import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BlogItem from './BlogItem'

const BlogsList = ({ blogs }) => {
  return (
    <Grid container spacing={4}>
      {blogs &&
        blogs.map((blog) => (
          <Grid item md={4} key={blog._id}>
            <BlogItem blog={blog} />
          </Grid>
        ))}
    </Grid>
  )
}

export default BlogsList
