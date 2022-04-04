import React, { useEffect } from 'react'

import { getBlog } from 'services/redux/actions/blog'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from 'react-spinkit'
import ChangeImg from 'components/CreateBlog/ChangeImg'

const AddImageBlog = ({ blog: { blog, loading }, match }) => {
  useEffect(() => {
    getBlog(match.params.id)
  }, [getBlog, match.params.id])

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
