import { Grid, Typography } from '@mui/material'
import React from 'react'
import BlogItem from './BlogItem'
import { useTranslation } from 'react-i18next'

const BlogsList = ({ blogs }) => {
  const { t } = useTranslation()

  return blogs && blogs.length > 0 ? (
    <Grid container spacing={4}>
      {blogs &&
        blogs.map((blog) => (
          <Grid item md={4} key={blog._id}>
            <BlogItem blog={blog} />
          </Grid>
        ))}
    </Grid>
  ) : (
    <Typography
      sx={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}
      variant="h2"
    >
      {t('myStuff.noBlogs')}
    </Typography>
  )
}

export default BlogsList
