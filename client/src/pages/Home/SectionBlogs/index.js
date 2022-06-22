import BlogsList from 'components/BlogsList'
import React, { useEffect } from 'react'

import { getBlogsApproved } from 'services/redux/actions/blog'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'

const SectionBlogs = ({ getBlogsApproved, blog: { blogs, loading } }) => {
  useEffect(() => {
    getBlogsApproved()
  }, [getBlogsApproved])

  const tempBlogs =
    blogs &&
    blogs.sort(function (a, b) {
      const keyA = a?.likes.length,
        keyB = b?.likes.length
      if (keyA < keyB) return 1
      if (keyA > keyB) return -1
      return 0
    })

  return loading || blogs === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <BlogsList blogs={tempBlogs.slice(0, 3)} />
  )
}

SectionBlogs.prototype = {
  getBlogsApproved: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlogsApproved })(SectionBlogs)
