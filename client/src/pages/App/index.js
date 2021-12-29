import React, { Fragment } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch
} from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';

export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Fragment>
  );
}
