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
      payload: { msg: err }
    })
  }
}

export const getMyLearnings = () => async (dispatch) => {
  try {
    const res = await api.get('/course/get_mylearnings')

    dispatch({
      type: COURSES.GET_LEARNINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const getMyCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/course/get_mycourses')
    dispatch({
      type: COURSES.GET_MYCOURSES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
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
      payload: { msg: err }
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
      payload: { msg: err }
    })
  }
}

export const addCourse = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/course', formData)

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
      payload: { msg: err }
    })
  }
}

export const editCourse = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/course/edit/${id}`, formData)

    dispatch({
      type: COURSES.EDIT_COURSE,
      payload: res.data
    })

    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.delete(`/course/${id}`)

    dispatch({
      type: COURSES.REMOVE_COURSE,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const changeImgCourse = (id, file) => async (dispatch) => {
  try {
    const res = await api.post(`/course/change_img/${id}`, file)

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
      payload: { msg: err }
    })
  }
}

export const addComment = (courseId, videoId, formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `/course/comment/${courseId}/${videoId}`,
      formData
    )

    dispatch({
      type: COURSES.ADD_COMMENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const deleteComment = (courseId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/course/comment/${courseId}/${commentId}`)

    dispatch({
      type: COURSES.REMOVE_COMMENT,
      payload: commentId
    })
  } catch (err) {
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const cleanUpCourse = () => (dispatch) =>
  dispatch({
    type: COURSES.CLEAN,
    payload: null
  })
