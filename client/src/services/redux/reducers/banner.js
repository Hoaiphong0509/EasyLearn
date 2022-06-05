import { BANNER } from 'constants/AppConstants'

const initialsState = {
  banners: [],
  bannersActive: [],
  banner: null,
  loading: true
}

const bannerReducer = (state = initialsState, action) => {
  const { type, payload } = action

  switch (type) {
    case BANNER.GET_BANNERS:
      return {
        ...state,
        loading: false,
        banners: payload
      }
    case BANNER.GET_BANNERS_ACTIVE:
      return {
        ...state,
        loading: false,
        bannersActive: payload
      }
    case BANNER.GET_BANNER:
      return {
        ...state,
        loading: false,
        banner: payload
      }
    case BANNER.ADD_BANNER:
      return {
        ...state,
        banner: payload,
        banners: [payload, ...state.banners],
        loading: false
      }
    case BANNER.UPDATE_BANNER:
      return {
        ...state,
        banner: payload,
        loading: false
      }
    case BANNER.REMOVE_BANNER:
      return {
        ...state,
        banners: state.banners.filter((bn) => bn._id !== payload),
        loading: false
      }
    case BANNER.BANNER_ERROR:
      return {
        ...state,
        banner: null,
        banners: [],
        bannersActive: [],
        loading: false
      }
    case BANNER.CLEAN:
      return {
        ...state,
        banner: null,
        banners: [],
        loading: false
      }
    default:
      return state
  }
}

export default bannerReducer
