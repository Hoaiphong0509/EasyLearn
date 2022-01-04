import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import setAuthToken from 'utils/setAuthToken'
import rootReducer from '../redux/reducers'

const initialsState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialsState,
  composeWithDevTools(applyMiddleware(...middleware))
)

let currentState = store.getState()

store.subscribe(() => {
  let previousState = currentState
  currentState = store.getState()

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token
    setAuthToken(token)
  }
})

export default store
