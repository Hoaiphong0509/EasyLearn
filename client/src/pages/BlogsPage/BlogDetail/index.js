import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBlog } from 'services/redux/actions/blog'
import Spinner from 'react-spinkit'
import BlogIn4 from 'components/BlogsList/BlogIn4'

const BlogDetail = ({ getBlog, blog: { blog, loading }, match }) => {
  useEffect(() => {
    getBlog(match.params.id)
  }, [getBlog, match.params.id])

  return loading || blog === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <BlogIn4 blog={blog} />
    </React.Fragment>
  )
}

BlogDetail.prototype = {
  getBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlog })(BlogDetail)
