import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import course from './course'
import blog from './blog'
import user from './user'

export default combineReducers({ auth, profile, course, blog, user })
