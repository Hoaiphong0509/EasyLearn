export const TOAST = 'toast'
export const HOME_CONTENT_ROOT_ID = 'home-content-root'

export const LINK_EMBED_YOUTUBE = 'https://www.youtube.com/embed/'

export const COURSE_IMG_DEFAULT =
  'https://res.cloudinary.com/hoaiphong/image/upload/v1642297083/EasyLearn/Img/Course/course_img_default_ou1mo8.jpg'

export const AVATAR_DEFAULT =
  'https://res.cloudinary.com/hoaiphong/image/upload/v1639892737/EasyLearn/Img/Avatar/abrr3bvn0t2ogytnvoid.png'

export const ENV = {
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.REACT_APP_GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID: process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN
}

export const AUTHS = {
  USER_LOADED: 'USER_LOADED',
  AUTH_ERROR: 'AUTH_ERROR',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_CREATOR_SUCCESS: 'REGISTER_CREATOR_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT'
}

export const USERS = {
  GET_USERS: 'GET_USERS',
  GET_USER: 'GET_USER',
  CHANGE_AVATAR: 'CHANGE_AVATAR',
  EDIT_USER: 'EDIT_USER',
  USER_ERRORS: 'USER_ERRORS',
  SEARCH_KEYWORD: 'SEARCH_KEYWORD'
}

export const PROFILES = {
  GET_IN_TOUCHE: 'GET_IN_TOUCHE',
  GET_PROFILE: 'GET_PROFILE',
  GET_PROFILES: 'GET_PROFILES',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  CLEAR_PROFILE: 'CLEAR_PROFILE',
  PROFILE_ERROR: 'PROFILE_ERROR'
}

export const COURSES = {
  GET_COURSE: 'GET_COURSE',
  GET_COURSES: 'GET_COURSES',
  GET_LEARNINGS: 'GET_LEARNINGS',
  GET_MYCOURSES: 'GET_MYCOURSES',
  ADD_COURSE: 'ADD_COURSE',
  EDIT_COURSE: 'EDIT_COURSE',
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  REMOVE_COURSE: 'REMOVE_COURSE',
  CHANGE_IMG: 'CHANGE_IMG',
  GET_LEARNING: 'GET_LEARNING',
  COURSE_ERROR: 'COURSE_ERROR',
  CLEAN: 'CLEAN'
}

export const BLOGS = {
  GET_BLOG: 'GET_BLOG',
  GET_BLOGS: 'GET_BLOGS',
  GET_MY_BLOGS: 'GET_MY_BLOGS',
  ADD_BLOG: 'ADD_BLOG',
  EDIT_BLOG: 'EDIT_BLOG',
  ADD_IMG: 'ADD_IMG',
  REMOVE_BLOG: 'REMOVE_BLOG',
  UPDATE_LIKES: 'UPDATE_LIKES',
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  BLOG_ERRORS: 'BLOG_ERRORS',
  CLEAN: 'CLEAN'
}

export const NOTIFY = {
  GET_NOTIFY: 'GET_NOTIFY',
  GET_NOTIFIES: 'GET_NOTIFIES',
  MARK_READ: 'MARK_READ',
  REMOVE_NOTIFY: 'REMOVE_NOTIFY',
  NOTIFY_ERROR: 'NOTIFY_ERROR'
}

export const FEEDBACK = {
  GET_FEEDBACK: 'GET_FEEDBACK',
  GET_LIST_FEEDBACK: 'GET_LIST_FEEDBACK',
  REMOVE_FEEDBACK: 'REMOVE_FEEDBACK',
  FEEDBACK_ERROR: 'FEEDBACK_ERROR'
}

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}

export const ROLES = {
  STUDENT: 'student',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}

export const TINYMCE_API_KEY =
  '7csh27co7j687nmi618ov5hxdrwfl6v4blupvbgbdtcxn9ct'
