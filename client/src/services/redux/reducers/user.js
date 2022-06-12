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
    case USERS.GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case USERS.EDIT_USER:
      return {
        ...state,
        user: payload,
        loading: false
      }
    case USERS.GET_USER:
      return {
        ...state,
        user: payload,
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
    case USERS.CLEAN:
      return {
        ...state,
        user: null,
        users: [],
        token: null,
        searchResult: null,
        loading: false
      }
    case USERS.REGISTER_CREATOR_SUCCESS:
    default:
      return state
  }
}

export default userReducer
