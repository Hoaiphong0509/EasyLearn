import { BLOGS } from 'constants/AppConstants'

const initialState = {
  blogs: [],
  blog: null,
  loading: true,
  error: {}
}

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case BLOGS.GET_BLOGS:
    case BLOGS.GET_MY_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false
      }
    case BLOGS.GET_BLOG:
      return {
        ...state,
        blog: payload,
        loading: false
      }
    case BLOGS.ADD_BLOG:
    case BLOGS.ADD_IMG:
      return {
        ...state,
        blog: payload,
        blogs: [payload, ...state.blogs],
        loading: false
      }
    case BLOGS.REMOVE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== payload),
        loading: false
      }
    case BLOGS.BLOG_ERRORS:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case BLOGS.UPDATE_LIKES:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === payload.id ? { ...blog, likes: payload.likes } : blog
        ),
        loading: false
      }
    case BLOGS.ADD_COMMENT:
      return {
        ...state,
        blog: { ...state.blog, comments: payload },
        loading: false
      }
    case BLOGS.REMOVE_COMMENT:
      return {
        ...state,
        blog: {
          ...state.blog,
          comments: state.blog.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      }
    case BLOGS.CLEAN:
      return {
        ...state,
        blog: null,
        loading: false
      }
    default:
      return state
  }
}

export default blogReducer
