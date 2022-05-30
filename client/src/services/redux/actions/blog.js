import api from 'utils/api'
import { BLOGS, TOAST_TYPE } from 'constants/AppConstants'
import { showToast } from 'utils/UIHelper'

export const getBlogs = () => async (dispatch) => {
  try {
    const res = await api.get('/blog')

    dispatch({
      type: BLOGS.GET_BLOGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const getBlogsApproved = () => async (dispatch) => {
  try {
    const res = await api.get('/blog/get_blogs_approved')

    dispatch({
      type: BLOGS.GET_BLOGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const getMyBlogs = () => async (dispatch) => {
  try {
    const res = await api.get('/blog/my_blogs')

    dispatch({
      type: BLOGS.GET_MY_BLOGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const getBlogsByUserId = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/blog/get_blogs/${id}`)

    dispatch({
      type: BLOGS.GET_BLOGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/blog/like/${id}`)

    dispatch({
      type: BLOGS.UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
    showToast({
      message: 'Đã like 💘',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })

    showToast({
      message: err.response.statusText,
      type: TOAST_TYPE.ERROR
    })
  }
}

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/blog/unlike/${id}`)

    dispatch({
      type: BLOGS.UPDATE_LIKES,
      payload: { id, likes: res.data }
    })

    showToast({
      message: 'Unlike 😢 ',
      type: TOAST_TYPE.WARNING
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })

    showToast({
      message: err.response.statusText,
      type: TOAST_TYPE.ERROR
    })
  }
}

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await api.delete(`/blog/${id}`)

    dispatch({
      type: BLOGS.REMOVE_BLOG,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const addBlog = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/blog', formData)

    dispatch({
      type: BLOGS.ADD_BLOG,
      payload: res.data
    })
    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const editBlog = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/blog/edit/${id}`, formData)

    dispatch({
      type: BLOGS.EDIT_BLOG,
      payload: res.data
    })
    showToast({
      message: 'Successfully!',
      type: TOAST_TYPE.SUCCESS
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const changeImgBlog = (id, img) => async (dispatch) => {
  try {
    const res = await api.put(`/blog/change_img/${id}`, img)

    dispatch({
      type: BLOGS.ADD_IMG,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const getBlog = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/blog/${id}`)

    dispatch({
      type: BLOGS.GET_BLOG,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const addComment = (blogId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/blog/comment/${blogId}`, formData)

    dispatch({
      type: BLOGS.ADD_COMMENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const deleteComment = (blogId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/blog/comment/${blogId}/${commentId}`)

    dispatch({
      type: BLOGS.REMOVE_COMMENT,
      payload: commentId
    })
  } catch (err) {
    dispatch({
      type: BLOGS.BLOG_ERRORS,
      payload: { msg: err }
    })
  }
}

export const cleanUpBlog = () => (dispatch) =>
  dispatch({
    type: BLOGS.CLEAN,
    payload: null
  })
