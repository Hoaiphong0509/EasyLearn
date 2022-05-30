import BlogsList from 'components/BlogsList'
import React, { useEffect } from 'react'

import { getBlogsApproved } from 'services/redux/actions/blog'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SectionBlogs = ({ getBlogsApproved, blog: { blogs } }) => {
  useEffect(() => {
    getBlogsApproved()
  }, [getBlogsApproved])

  return <BlogsList blogs={blogs} />
}

SectionBlogs.prototype = {
  getBlogsApproved: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlogsApproved })(SectionBlogs)
