import React from 'react'
import { Route as DefaultRoute, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import BlankLayout from 'layouts/BlankLayout'

const PrivateRoute = ({
  component: Component,
  layout: Layout = BlankLayout,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <DefaultRoute
    {...rest}
    render={(props) =>
      loading ? (
        <Spinner name="cube-grid" color="aqua" />
      ) : isAuthenticated ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
