/*
import React, { useEffect, useState } from "react";
import { Login } from "./auth/Login.js";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import  Home  from "./pages/student/student";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  }, [isAuthenticated]);

  return (
    <Router>
        <Routes>
            {isAuthenticated && 
            <Route path="/" render={() => <Home  setIsAuthenticated={setIsAuthenticated} /> } />}

            <Route path='/login' exact render={() => isAuthenticated? 
            <Route to='/login' /> 
            : <Login setIsAuthenticated={setIsAuthenticated} />} />
            {isAuthenticated && <Route to='/products' />}
            <Route to='/' />
        </Routes>
    </Router>
  )
}

export default App;*/

import React, { useEffect, useState } from "react";
import { Login } from "./auth/Login.js";
import { Signup } from "./auth/signup.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/student/student";
import Course from "./pages/course/course.js";
import Teacher from "./pages/teacher/teacher.js"
import Admin from "./pages/admin/admin.js"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  }, []);

  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/course" element={<Course setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/teacher" element={<Teacher setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin" element={<Admin setIsAuthenticated={setIsAuthenticated} />} />

        {isAuthenticated ? (
          <Route path="/home" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          <Route to="/login" />
        )}
      </Routes>
    </Router>
  );
}

export default App;
