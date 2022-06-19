import api from 'utils/api'

import { AUTHS, BANNER, TOAST_TYPE, USERS } from 'constants/AppConstants'
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
      payload: { msg: err }
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
  } catch (err) {
    dispatch({
      type: USERS.USER_ERRORS,
      payload: { msg: err }
    })
  }
}

export const registerCreator = (t, formData) => async (dispatch) => {
  try {
    await api.post('/users/register_creator', formData)
    dispatch({
      type: USERS.REGISTER_CREATOR_SUCCESS,
      payload: null
    })
    showToast({
      message: t('editProfile.creator.registerSuccess'),
      type: TOAST_TYPE.SUCCESS
    })
    dispatch(loadUser())
  } catch (error) {
    console.log({ error })

    if (error) {
      showToast({
        message: 'Something wrong!',
        type: TOAST_TYPE.ERROR
      })
    }

    dispatch({
      type: AUTHS.REGISTER_FAIL
    })
  }
}

export const search = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: USERS.CLEAN_SEARCH_RESULT
    })
    const res = await api.post(`/users/search`, keyword)

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

export const sendFeedback = async (formData) => {
  try {
    await api.post(`/users/send_feedback`, formData)
    showToast({
      message: 'Send Feedback successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    showToast({
      message: 'Failture!',
      type: TOAST_TYPE.ERROR
    })
  }
}

export const getBannersActive = () => async (dispatch) => {
  try {
    const res = await api.get(`/users/get_banners_active`)
    dispatch({
      type: BANNER.GET_BANNERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BANNER.BANNER_ERROR
    })
  }
}
