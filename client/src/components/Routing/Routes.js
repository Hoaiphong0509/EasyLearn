import React from 'react'

import { Switch } from 'react-router-dom'

import Route from 'components/Routing/Route'
import PrivateRoute from 'components/Routing/PrivateRoute'

import DefaultLayout from 'layouts/DefaultLayout'
import EditProfileLayout from 'layouts/EditProfileLayout'
import BlankLayout from 'layouts/BlankLayout'

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

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/" layout={DefaultLayout} component={Home} />
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
        <Route exact path="/server_error" component={ServerErrorPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  )
}

export default Routes
