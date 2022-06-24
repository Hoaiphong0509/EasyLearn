import api from 'utils/api'
import { BANNER, TOAST_TYPE } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const getBanners = () => async (dispatch) => {
  try {
    const res = await api.get('/moderator/banners')

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

export const getBanner = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/moderator/banners/${id}`)

    dispatch({
      type: BANNER.GET_BANNER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BANNER.BANNER_ERROR
    })
  }
}

export const addBanner = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/moderator/banners', formData)

    dispatch({
      type: BANNER.ADD_BANNER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BANNER.BANNER_ERROR
    })
  }
}

export const changeImgBanner = (id, img) => async (dispatch) => {
  try {
    const res = await api.put(`/moderator/change_img_banner/${id}`, img)

    dispatch({
      type: BANNER.UPDATE_BANNER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BANNER.BANNER_ERROR
    })
  }
}

export const toggleActiveBanner = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/moderator/banners/toggle_active/${id}`)

    dispatch({
      type: BANNER.UPDATE_BANNER,
      payload: res
    })
  } catch (err) {
    if (err) {
      showToast({
        type: TOAST_TYPE.ERROR
      })
    }
    dispatch({
      type: BANNER.BANNER_ERROR
    })
  }
}

export const deleteBanner = (id) => async (dispatch) => {
  try {
    await api.delete(`/moderator/banners/delete/${id}`)

    dispatch({
      type: BANNER.REMOVE_BANNER,
      payload: id
    })
  } catch (err) {
    if (err) {
      showToast({
        type: TOAST_TYPE.ERROR
      })
    }
    dispatch({
      type: BANNER.BANNER_ERROR
    })
  }
}

export const cleanUpBanner = () => (dispatch) =>
  dispatch({
    type: BANNER.CLEAN,
    payload: null
  })
