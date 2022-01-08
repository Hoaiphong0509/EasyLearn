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

export const register = (formData, t) => async (dispatch) => {
  try {
    const res = await api.post('/users/register_student', formData)
    dispatch({
      type: AUTHS.REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (error) {
    const errMsgs = error.response.data.errors
    console.log({ errMsgs })

    if (errMsgs) {
      switch (errMsgs[0].msg) {
        case 'msgErrInvalidEmail':
          showToast({
            message: t('auth.msgErrInvalidEmail'),
            type: TOAST_TYPE.ERROR
          })
          break
        case 'msgErrEmail':
          showToast({
            message: t('auth.msgErrEmail'),
            type: TOAST_TYPE.ERROR
          })
          break
        case 'msgErrExistEmail':
          showToast({
            message: t('auth.msgErrExistEmail'),
            type: TOAST_TYPE.ERROR
          })
          break
        case 'msgErrPassword':
          showToast({
            message: t('auth.msgErrPassword'),
            type: TOAST_TYPE.ERROR
          })
          break
        default:
          break
      }
    }

    dispatch({
      type: AUTHS.REGISTER_FAIL
    })
  }
}

export const login = (formData, t) => async (dispatch) => {
  try {
    const res = await api.post('/auth', formData)

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
        message: t('auth.invalidInfor'),
        type: TOAST_TYPE.ERROR
      })
    }

    dispatch({
      type: AUTHS.LOGIN_FAIL
    })
  }
}

export const registerCreator = (formData, t) => async (dispatch) => {
  try {
    const res = await api.post('/users/register_creator', formData)
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
