import api from 'utils/api'
import { NOTIFY, TOAST_TYPE } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const getMyNotifies = () => async (dispatch) => {
  try {
    const res = await api.get('/notify')

    dispatch({
      type: NOTIFY.GET_NOTIFIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: NOTIFY.NOTIFY_ERROR
    })
  }
}

export const getNotify = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/notify/${id}`)

    dispatch({
      type: NOTIFY.GET_NOTIFIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: NOTIFY.NOTIFY_ERROR
    })
  }
}

export const deleteNotify = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/notify/${id}`)

    dispatch({
      type: NOTIFY.REMOVE_NOTIFY,
      payload: res.data
    })
  } catch (err) {
    console.log({ err })

    if (err) {
      showToast({
        // message: t('auth.invalidInfor'),
        type: TOAST_TYPE.ERROR
      })
    }
    dispatch({
      type: NOTIFY.NOTIFY_ERROR
    })
  }
}
