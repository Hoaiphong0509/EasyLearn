import { USERS } from 'constants/AppConstants'

const initialState = {
  user: null,
  users: [],
  loading: true,
  token: null,
  searchResult: null
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USERS.CHANGE_AVATAR:
      return {
        ...state,
        token: payload,
        loading: false
      }
    case USERS.GET_IN_TOUCHE:
      return {
        ...state,
        loading: false
      }
    case USERS.SEARCH_KEYWORD:
      return {
        ...state,
        searchResult: payload,
        loading: false
      }
    case USERS.USER_ERRORS:
      return {
        ...state,
        user: null,
        loading: false
      }
    default:
      return state
  }
}

export default userReducer
