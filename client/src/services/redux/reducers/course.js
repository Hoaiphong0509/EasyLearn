import { COURSES } from 'constants/AppConstants'

const initialState = {
  courses: [],
  course: null,
  loading: true,
  error: {}
}

const courseReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case COURSES.GET_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false
      }
    case COURSES.GET_COURSE:
      return {
        ...state,
        course: payload,
        loading: false
      }
    case COURSES.ADD_COURSE:
      return {
        ...state,
        course: payload,
        courses: [payload, ...state.courses],
        loading: false
      }
    case COURSES.UPDATE_COURSE:
    case COURSES.CHANGE_IMG:
      return {
        ...state,
        course: payload,
        loading: false
      }
    case COURSES.COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        course: null
      }
    case COURSES.CLEAN: 
      return {
        ...state,
        course: null,
        loading: false
      }
    default:
      return state
  }
}

export default courseReducer
