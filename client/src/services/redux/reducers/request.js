import { REQUEST } from 'constants/AppConstants'

const initialsState = {
  requests: [],
  request: null,
  loading: true
}

const requestReducer = (state = initialsState, action) => {
  const { type, payload } = action

  switch (type) {
    case REQUEST.GET_REQUESTS:
      return {
        ...state,
        loading: false,
        requests: payload
      }
    case REQUEST.GET_REQUEST:
      return {
        ...state,
        loading: false,
        request: payload
      }
    case REQUEST.ACCEPT:
    case REQUEST.DENNY:
      return {
        ...state,
        requests: state.requests.filter((rq) => rq._id !== payload),
        loading: false
      }
    case REQUEST.ERROR:
      return {
        ...state,
        request: null,
        requests: [],
        loading: false
      }
    case REQUEST.CLEAN:
      return {
        ...state,
        request: null,
        requests: [],
        loading: false
      }
    default:
      return state
  }
}

export default requestReducer
