import api from 'utils/api'

import { TOAST_TYPE, USERS } from 'constants/AppConstants'
import { loadUser } from './auth'
import { showToast } from 'utils/UIHelper'

export const getUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/moderator/get_users')

    dispatch({
      type: USERS.GET_USERS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: USERS.USER_ERRORS,
      payload: {msg: err }
    })
  }
}
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await api.get('/admin/get_user')

    dispatch({
      type: USERS.GET_USERS,
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
      payload: {msg: err }
    })
  }
}

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
      payload: {msg: err }
    })
  }
}

export const search = (keyword) => async (dispatch) => {
  try {

    const res = await api.post(`/users/search`, keyword)

    console.log('SEARCH RES: ', res.data)
    dispatch({
      type: USERS.SEARCH_KEYWORD,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.USER_ERRORS,
      payload: { msg: err }
    })
  }
}
