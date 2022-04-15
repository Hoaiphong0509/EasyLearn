import { AUTHS, PROFILES } from 'constants/AppConstants'

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PROFILES.GET_PROFILE:
    case PROFILES.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILES.GET_IN_TOUCHE:
      return {
        ...state,
        profile: { learnings: [payload, ...state.profile.learnings] },
        loading: false
      }
    case PROFILES.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILES.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: []
      }
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
