import api from 'utils/api'

import { COURSES, TOAST_TYPE } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const getCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/course')

    dispatch({
      type: COURSES.GET_COURSES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const getCoursesByUserId = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/course/get_courses/${id}`)

    dispatch({
      type: COURSES.GET_COURSES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const getCourse = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/course/${id}`)

    dispatch({
      type: COURSES.GET_COURSE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const addCourse = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/course/mycourses', formData)

    dispatch({
      type: COURSES.ADD_COURSE,
      payload: res.data
    })

    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const changeImgCourse = (id, file) => async (dispatch) => {
  try {
    const res = await api.post(`/course/mycourses/change_img/${id}`, file)

    dispatch({
      type: COURSES.CHANGE_IMG,
      payload: res.data
    })
    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const cleanUpCourse = () => (dispatch) =>
  dispatch({
    type: COURSES.CLEAN,
    payload: null
  })
