import { AUTHS } from 'constants/AppConstants'

const initialsState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

const authReducer = (state = initialsState, action) => {
  const { type, payload } = action

  switch (type) {
    case AUTHS.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case AUTHS.REGISTER_SUCCESS:
    case AUTHS.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case AUTHS.REGISTER_FAIL:
    case AUTHS.AUTH_ERROR:
    case AUTHS.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }

    default:
      return state
  }
}

export default authReducer
