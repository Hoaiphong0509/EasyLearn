import { NOTIFY } from 'constants/AppConstants'

const initialsState = {
  notify: null,
  notifies: [],
  loading: true
}

const notifyReducer = (state = initialsState, action) => {
  const { type, payload } = action

  switch (type) {
    case NOTIFY.MARK_READ:
    case NOTIFY.GET_NOTIFY:
      return {
        ...state,
        notify: payload,
        loading: false
      }
    case NOTIFY.GET_NOTIFIES:
      return {
        ...state,
        notifies: payload,
        loading: false
      }
    case NOTIFY.NOTIFY_ERROR:
      return {
        ...state,
        notify: null,
        notifies: [],
        loading: false
      }

    default:
      return state
  }
}

export default notifyReducer
