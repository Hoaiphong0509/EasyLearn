import { COURSES } from 'constants/AppConstants'

const initialState = {
  courses: [],
  mylearnings: [],
  mycourses: [],
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
    case COURSES.GET_LEARNINGS:
      return {
        ...state,
        mylearnings: payload,
        loading: false
      }
    case COURSES.GET_MYCOURSES:
      return {
        ...state,
        mycourses: payload,
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
    case COURSES.REMOVE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
        loading: false
      }
    case COURSES.EDIT_COURSE:
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
        course: null,
        courses: [],
        mylearnings: [],
        mycourses: []
      }
    case COURSES.CLEAN:
      return {
        ...state,
        course: null,
        mylearnings: [],
        mycourses: [],
        loading: false
      }
    default:
      return state
  }
}

export default courseReducer
