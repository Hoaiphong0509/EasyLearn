import { ACTIONS_TYPES } from 'constants/AppConstants'

const initialStae = []

export default function (state = initialStae, action) {
  const { type, payload } = action

  const { SET_ALERT, REMOVE_ALERT } = ACTIONS_TYPES

  switch (action.types) {
    case SET_ALERT:
      return [...state, payload]
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload)
    default:
      return state
  }
}
