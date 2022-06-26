import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBlog } from 'services/redux/actions/blog'

import ChangeImg from 'components/CreateBlog/ChangeImg'
import Spinner from 'react-spinkit'

const AddImageBlog = ({ blog: { blog, loading }, match }) => {
  useEffect(() => {
    getBlog(match.params.id)
  }, [match.params.id])

  return loading || blog === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <React.Fragment>
      <ChangeImg blog={blog} />
    </React.Fragment>
  )
}

AddImageBlog.prototype = {
  getBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, { getBlog })(AddImageBlog)
