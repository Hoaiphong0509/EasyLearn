import { AUTHS } from 'constants/AppConstants'

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case AUTHS.REGISTER_CREATOR_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case AUTHS.REGISTER_FAIL:
      return {
        ...state,
        profile: null,
        loading: false
      }
    default:
      return state
  }
}

export default profileReducer
