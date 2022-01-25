import BlogsList from 'components/BlogsList'
import React, { useEffect } from 'react'

import { getBlogs } from 'services/redux/actions/blog'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SectionBlogs = ({ getBlogs, blog: { blogs } }) => {
  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  return <BlogsList blogs={blogs} />
}

SectionBlogs.prototype = {
  getBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlogs })(SectionBlogs)
