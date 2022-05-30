import api from 'utils/api'

import { TOAST_TYPE, USERS } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const addModerator = (email) => async (dispatch) => {
  try {
    const res = await api.post(`/admin/add_moderator`, email)

    dispatch({
      type: USERS.EDIT_USER,
      payload: res.data
    })
    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: USERS.USER_ERRORS,
      payload: { msg: err }
    })
  }
}
