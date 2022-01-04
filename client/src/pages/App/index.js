import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'

import { Provider } from 'react-redux'
import store from 'services/store'
import setAuthToken from 'utils/setAuthToken'
import { loadUser } from 'services/redux/actions/auth'
import { AUTHS } from 'constants/AppConstants'

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
          <Route exact path="/" component={Home} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
