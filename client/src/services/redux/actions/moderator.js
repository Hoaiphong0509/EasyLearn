import api from 'utils/api'

import { BLOGS, COURSES, FEEDBACK, TOAST_TYPE } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const approveCourse = (idCourse) => async (dispatch) => {
  try {
    const res = await api.post(`/moderator/approve_course/${idCourse}`)

    dispatch({
      type: COURSES.EDIT_COURSE,
      payload: res.data
    })
    showToast({
      message: 'Approved Succesfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const unApproveCourse = (idCourse) => async (dispatch) => {
  try {
    const res = await api.post(`/moderator/unapprove_course/${idCourse}`)

    dispatch({
      type: COURSES.EDIT_COURSE,
      payload: res.data
    })
    showToast({
      message: 'Unapproved Succesfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: COURSES.COURSE_ERROR,
      payload: { msg: err }
    })
  }
}

export const approveBlog = (idBlog) => async (dispatch) => {
  try {
    const res = await api.post(`/moderator/approve_blog/${idBlog}`)

    dispatch({
      type: BLOGS.EDIT_BLOG,
      payload: res.data
    })
    showToast({
      message: 'Approve successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const unApproveBlog = (idBlog) => async (dispatch) => {
  try {
    const res = await api.post(`/moderator/unapprove_blog/${idBlog}`)

    dispatch({
      type: BLOGS.EDIT_BLOG,
      payload: res.data
    })
    showToast({
      message: 'Unapprove successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const getListFeedback = () => async (dispatch) => {
  try {
    const res = await api.get(`/moderator/get_feedback`)

    dispatch({
      type: FEEDBACK.GET_LIST_FEEDBACK,
      payload: res.data
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: FEEDBACK.FEEDBACK_ERROR,
      payload: { msg: err }
    })
  }
}

export const getFeedback= (id) => async (dispatch) => {
  try {
    const res = await api.get(`/moderator/get_feedback/${id}`)

    dispatch({
      type: FEEDBACK.GET_FEEDBACK,
      payload: res.data
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: FEEDBACK.FEEDBACK_ERROR,
      payload: { msg: err }
    })
  }
}

export const deleteFeedback= (id) => async (dispatch) => {
  try {
    await api.delete(`/moderator/get_feedback/${id}`)

    dispatch({
      type: FEEDBACK.REMOVE_FEEDBACK,
      payload: id
    })
  } catch (err) {
    showToast({
      message: err.response.data.msg,
      type: TOAST_TYPE.ERROR
    })
    dispatch({
      type: FEEDBACK.FEEDBACK_ERROR,
      payload: { msg: err }
    })
  }
}
