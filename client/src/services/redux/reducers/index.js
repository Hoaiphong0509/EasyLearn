import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import course from './course'
import blog from './blog'
import user from './user'
import notify from './notify'
import feedback from './feedback'
import banner from './banner'

export default combineReducers({
  auth,
  profile,
  course,
  blog,
  user,
  notify,
  feedback,
  banner
})
