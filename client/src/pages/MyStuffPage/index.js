import React, { useEffect } from 'react'

import { getMyBlogs } from 'services/redux/actions/blog'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyStuff from 'components/MyStuff'

const MyStuffPage = ({ getMyBlogs, blog: { blogs }, auth: { user } }) => {
  useEffect(() => {
    getMyBlogs()
  }, [getMyBlogs])

  return (
    <React.Fragment>
      <MyStuff blogs={blogs} user={user} />
    </React.Fragment>
  )
}

MyStuffPage.prototype = {
  getMyBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  blog: state.blog,
  auth: state.auth
})

export default connect(mapStateToProps, { getMyBlogs })(MyStuffPage)
