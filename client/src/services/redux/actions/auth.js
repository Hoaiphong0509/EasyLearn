import api from 'utils/api'
import {
  AUTHS,
  BLOGS,
  COURSES,
  PROFILES,
  TOAST_TYPE,
  USERS
} from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth')

    dispatch({
      type: AUTHS.USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTHS.AUTH_ERROR
    })
  }
}

export const googleLogin = (idToken) => async (dispatch) => {
  try {
    const res = await api.post('/auth/google', { idToken })

    dispatch({
      type: AUTHS.LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    console.log({ err })

    if (err) {
      showToast({
        // message: t('auth.invalidInfor'),
        type: TOAST_TYPE.ERROR
      })
    }

    dispatch({
      type: AUTHS.LOGIN_FAIL
    })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: AUTHS.LOGOUT,
    payload: null
  })
  dispatch({
    type: USERS.CLEAN,
    payload: null
  })
  dispatch({
    type: PROFILES.CLEAR_PROFILE,
    payload: null
  })
  dispatch({
    type: BLOGS.CLEAN,
    payload: null
  })
  dispatch({
    type: COURSES.CLEAN,
    payload: null
  })
}
