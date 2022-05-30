import React from 'react'

import { Switch } from 'react-router-dom'

import Route from 'components/Routing/Route'
import PrivateRoute from 'components/Routing/PrivateRoute'

import DefaultLayout from 'layouts/DefaultLayout'
import EditProfileLayout from 'layouts/EditProfileLayout'

import Home from 'pages/Home'
import EditProfile from 'pages/ProfilePage/EditProfile'
import ProfilePage from 'pages/ProfilePage'
import CoursesPage from 'pages/CoursesPage'
import BlogsPage from 'pages/BlogsPage'
import CreateCourse from 'pages/CoursesPage/CreateCourse'
import CreateBlog from 'pages/BlogsPage/CreateBlog'
import BlogDetail from 'pages/BlogsPage/BlogDetail'
import CourseDetail from 'pages/CoursesPage/CourseDetail'
import AreaLearning from 'pages/AreaLearning'
import MyStuffPage from 'pages/MyStuffPage'
import AddImageCoursePage from 'pages/CoursesPage/AddImageCoursePage'
import NotFoundPage from 'pages/NotFoundPage'
import ServerErrorPage from 'pages/ServerErrorPage'
import AddImageBlog from 'pages/BlogsPage/AddImageBlog'
import EditBlog from 'pages/BlogsPage/EditBlog'
import EditCourse from 'pages/CoursesPage/EditCourse'
import AdminLayout from 'layouts/AdminLayout'
import Dashboard from 'pages/Admin/Dashboard'
import User from 'pages/Admin/Users'
import Blogs from 'pages/Admin/Blogs'
import Courses from 'pages/Admin/Courses'
import Moderator from 'pages/Admin/Moderator'
import Banner from 'pages/Admin/Banner'
import Feedback from 'pages/Admin/Feedback'
import HomeLayout from 'layouts/HomeLayout'
import FeedbackPage from 'pages/FeedbackPage'
import FeedbackDetail from 'pages/Admin/Feedback/FeedbackDetail/FeedbackDetail'
import About from 'pages/About'
import Policy from 'pages/Policy'
import Security from 'pages/Security'

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/" layout={HomeLayout} component={Home} />
        <Route
          exact
          path="/profile/:id"
          component={ProfilePage}
          layout={DefaultLayout}
        />
        <Route
          exact
          path="/courses"
          component={CoursesPage}
          layout={DefaultLayout}
        />
        <Route
          exact
          path="/courses/course_detail/:id"
          component={CourseDetail}
          layout={DefaultLayout}
        />
        <PrivateRoute
          exact
          path="/courses/create_course"
          layout={DefaultLayout}
          component={CreateCourse}
        />
        <PrivateRoute
          exact
          path="/courses/edit_course/:id"
          layout={DefaultLayout}
          component={EditCourse}
        />
        <PrivateRoute
          exact
          path="/courses/add_img/:id"
          component={AddImageCoursePage}
          layout={DefaultLayout}
        />
        <Route
          exact
          path="/blogs"
          component={BlogsPage}
          layout={DefaultLayout}
        />
        <Route
          exact
          path="/blogs/blog_detail/:id"
          component={BlogDetail}
          layout={DefaultLayout}
        />
        <PrivateRoute
          exact
          path="/blogs/create_blog"
          layout={DefaultLayout}
          component={CreateBlog}
        />
        <PrivateRoute
          exact
          path="/blogs/edit_blog/:id"
          layout={DefaultLayout}
          component={EditBlog}
        />
        <Route
          exact
          path="/blogs/add_img/:id"
          component={AddImageBlog}
          layout={DefaultLayout}
        />
        <PrivateRoute
          exact
          path="/edit-profile"
          layout={EditProfileLayout}
          component={EditProfile}
        />

        <PrivateRoute
          exact
          path="/edit-profile"
          layout={EditProfileLayout}
          component={EditProfile}
        />
        <PrivateRoute
          exact
          path="/my_stuff"
          layout={DefaultLayout}
          component={MyStuffPage}
        />
        <PrivateRoute
          exact
          path="/learning/:id"
          layout={DefaultLayout}
          component={AreaLearning}
        />
        <Route
          exact
          path="/feedback"
          layout={DefaultLayout}
          component={FeedbackPage}
        />
        <Route exact path="/about" layout={DefaultLayout} component={About} />
        <Route exact path="/policy" layout={DefaultLayout} component={Policy} />
        <Route
          exact
          path="/security"
          layout={DefaultLayout}
          component={Security}
        />
        <PrivateRoute
          exact
          path="/admin"
          layout={AdminLayout}
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path="/admin/users"
          layout={AdminLayout}
          component={User}
        />
        <PrivateRoute
          exact
          path="/admin/user/:id"
          layout={AdminLayout}
          component={ProfilePage}
        />
        <PrivateRoute
          exact
          path="/admin/blogs"
          layout={AdminLayout}
          component={Blogs}
        />
        <PrivateRoute
          exact
          path="/admin/blog/:id"
          layout={AdminLayout}
          component={BlogDetail}
        />
        <PrivateRoute
          exact
          path="/admin/courses"
          layout={AdminLayout}
          component={Courses}
        />
        <PrivateRoute
          exact
          path="/admin/moderator"
          layout={AdminLayout}
          component={Moderator}
        />
        <PrivateRoute
          exact
          path="/admin/banner"
          layout={AdminLayout}
          component={Banner}
        />
        <PrivateRoute
          exact
          path="/admin/feedback"
          layout={AdminLayout}
          component={Feedback}
        />
        <PrivateRoute
          exact
          path="/admin/feedback/:id"
          layout={AdminLayout}
          component={FeedbackDetail}
        />
        <Route exact path="/server_error" component={ServerErrorPage} />
        <Route component={NotFoundPage} layout={DefaultLayout} />
      </Switch>
    </section>
  )
}

export default Routes
