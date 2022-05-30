import { FEEDBACK } from 'constants/AppConstants'

const initialsState = {
  feedbacks: [],
  feedback: null,
  loading: true
}

const feedbackReducer = (state = initialsState, action) => {
  const { type, payload } = action

  switch (type) {
    case FEEDBACK.GET_LIST_FEEDBACK:
      return {
        ...state,
        loading: false,
        feedbacks: payload
      }
    case FEEDBACK.GET_FEEDBACK:
      return {
        ...state,
        loading: false,
        feedback: payload
      }
    case FEEDBACK.REMOVE_FEEDBACK:
      return {
        ...state,
        feedbacks: state.feedbacks.filter((fb) => fb._id !== payload),
        loading: false
      }
    case FEEDBACK.FEEDBACK_ERROR:
      return {
        ...state,
        feedback: null,
        feedbacks: [],
        loading: false
      }
    default:
      return state
  }
}

export default feedbackReducer
