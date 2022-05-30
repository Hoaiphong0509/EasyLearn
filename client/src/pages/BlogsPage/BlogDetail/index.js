import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBlog } from 'services/redux/actions/blog'
import Spinner from 'react-spinkit'
import BlogIn4 from 'components/BlogsList/BlogIn4'
import { ROLES } from 'constants/AppConstants'
import NotFoundPage from 'pages/NotFoundPage'
const BlogDetail = ({
  auth: { user },
  getBlog,
  blog: { blog, loading },
  match
}) => {
  useEffect(() => {
    getBlog(match.params.id)
  }, [getBlog, match.params.id])

  return loading || blog === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : blog.status === 'approved' ||
    (user &&
      (user.roles.includes(ROLES.ADMIN) ||
        user.roles.includes(ROLES.MODERATOR) ||
        user._id === blog.user)) ? (
    <BlogIn4 blog={blog} />
  ) : (
    <NotFoundPage title="BLOGS ĐÃ BỊ BAN" />
  )
}

BlogDetail.prototype = {
  getBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  blog: state.blog,
  auth: state.auth
})

export default connect(mapStateToProps, { getBlog })(BlogDetail)
