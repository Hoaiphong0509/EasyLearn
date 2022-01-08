import React, { Fragment, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route as DefaultRoute,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'services/store'
import setAuthToken from 'utils/setAuthToken'
import { loadUser } from 'services/redux/actions/auth'
import { AUTHS } from 'constants/AppConstants'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Route from 'components/Routing/Route'
import PrivateRoute from 'components/Routing/PrivateRoute'

import DefaultLayout from 'layouts/DefaultLayout'
import BlankLayout from 'layouts/BlankLayout'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import EditProfile from 'pages/Profile/EditProfile'
import Profile from 'pages/Profile'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import EditProfileLayout from 'layouts/EditProfileLayout'

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: AUTHS.LOGOUT })
    })
  }, [])

  return (
    <Provider store={store}>
      <div id="toast"></div>
      <Router>
        <Fragment>
          <Route exact path="/" layout={DefaultLayout} component={Home} />
          <section className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/profile/:id"
                component={Profile}
                layout={BlankLayout}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                layout={EditProfileLayout}
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
