import api from 'utils/api'

import { PROFILES, TOAST } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me')

    dispatch({
      type: PROFILES.GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/${id}`)

    dispatch({
      type: PROFILES.GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const getInTouche = (id) => async (dispatch) => {
  try {
    await api.post(`/profile/add_learning/${id}`)

    dispatch({
      type: PROFILES.GET_IN_TOUCHE,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const editProfile = (formData) => async (dispatch) => {
  try {
    const res = await api.post('profile/me', formData)

    dispatch({
      type: PROFILES.UPDATE_PROFILE,
      payload: res.data
    })
    showToast({
      message: 'Successfully!',
      type: TOAST.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/experience', formData)

    dispatch({
      type: PROFILES.UPDATE_PROFILE,
      payload: res.data
    })

    showToast({
      message: 'Successfully!',
      type: TOAST.SUCCESS
    })
  } catch (err) {
    showToast({
      message: err.response.data.errors,
      type: TOAST.ERRORS
    })
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/education', formData)

    dispatch({
      type: PROFILES.UPDATE_PROFILE,
      payload: res.data
    })
    showToast({
      message: 'Successfully!',
      type: TOAST.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`)

    dispatch({
      type: PROFILES.UPDATE_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`)

    dispatch({
      type: PROFILES.UPDATE_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILES.PROFILE_ERROR,
      payload: { msg: err }
    })
  }
}

export const cleanUpProfile = () => (dispatch) =>
  dispatch({
    type: PROFILES.CLEAR_PROFILE,
    payload: null
  })
