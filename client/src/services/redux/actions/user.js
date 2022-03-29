import api from 'utils/api'

import { TOAST_TYPE, USERS } from 'constants/AppConstants'
import { loadUser } from './auth'
import { showToast } from 'utils/UIHelper'

export const changeAvatar = (file) => async (dispatch) => {
  try {
    const res = await api.post('/users/change_avatar', file)

    dispatch({
      type: USERS.CHANGE_AVATAR,
      payload: res.data
    })

    dispatch(loadUser())
    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: USERS.USER_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const getInTouche = (id) => async (dispatch) => {
  try {
    const res = await api.post(`/users/add_learning/${id}`)

    dispatch({
      type: USERS.GET_IN_TOUCHE,
      payload: res.data
    })
    dispatch(loadUser())
    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: USERS.USER_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const search = (keyword) => async (dispatch) => {
  try {
    const res = await api.post(`/users/search`, keyword)
    dispatch({
      type: USERS.SEARCH_KEYWORD,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.USER_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}