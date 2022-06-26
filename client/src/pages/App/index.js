import { AUTHS } from 'constants/AppConstants'
import { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadUser } from 'services/redux/actions/auth'
import store from 'services/store'
import setAuthToken from 'utils/setAuthToken'

import Route from 'components/Routing/Route'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'devextreme/dist/css/dx.light.css'

import Routes from 'components/Routing/Routes'

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router basename="/">
          <Fragment>
            <Route component={Routes} />
          </Fragment>
        </Router>
      </LocalizationProvider>
    </Provider>
  )
}

export default App
