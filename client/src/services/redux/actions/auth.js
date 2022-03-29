import api from 'utils/api'
import { AUTHS, TOAST_TYPE } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'
import setAuthToken from 'utils/setAuthToken'

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

    // setAuthToken(res.data.token)
    // localStorage.setItem('user', JSON.stringify(res.data.user))
    dispatch({
      type: AUTHS.LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    console.log({ err })
    const errors = err.response.data.errors

    if (errors) {
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

export const registerCreator = (t) => async (dispatch) => {
  try {
    const res = await api.post('/users/register_creator')
    dispatch({
      type: AUTHS.REGISTER_CREATOR_SUCCESS,
      payload: res.data
    })
    showToast({
      message: t('editProfile.creator.registerSuccess'),
      type: TOAST_TYPE.SUCCESS
    })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      showToast({
        message: 'something wrong!',
        type: TOAST_TYPE.ERROR
      })
    }

    dispatch({
      type: AUTHS.REGISTER_FAIL
    })
  }
}

export const logout = () => ({ type: AUTHS.LOGOUT })
