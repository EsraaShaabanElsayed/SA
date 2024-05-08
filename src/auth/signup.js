
import React, { useState } from "react";
import classes from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";
import { Stack } from "@mui/system";
import Box from '@mui/material/Box'

export const Signup = ({ setIsAuthenticated }) => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  
  const [signup, setSignup] = useState({
    name:'',
    email: '',
    password: '',
    err: '',
    loading: false
  });

  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const adminRegister = () => {
    axios
      .post(`http://localhost:8090/admin/adminRegister`, {
        adminName: signup.name,
        adminEmail: signup.email,
        adminPassword: signup.password
        })
        .then((response) => {
          console.log('logged in successfully!');
          setIsAuthenticated(true);
          navigate('/admin')
        })
        .catch((error) => {
          console.log('something went wrong!');
        });
  }
  const studentRegister = () => {
    axios
      .post(`http://localhost:8090/student/studentRegister`, {
        name: signup.name,
        email: signup.email,
        password: signup.password
        })
        .then((response) => {
          console.log('logged in successfully!');
          setIsAuthenticated(true);
          navigate('/');
        })
        .catch((error) => {
          console.log('something went wrong!');
        });
  }
  const teacherRegister = () => {
    axios
      .post(`http://localhost:8090/teacher/teacherRegister`, {
        adminName: signup.name,
        adminEmail: signup.email,
        adminPassword: signup.password
        })
        .then((response) => {
          console.log('logged in successfully!');
          setIsAuthenticated(true);
          navigate('/teacher')
        })
        .catch((error) => {
          console.log('something went wrong!');
        });
  }
  const handleSubmit =  (event) => {
    // setIsLoading(true);
    // event.preventDefault();
    // await api
    //   .userAuthenticate(inputs)
    //   .then((res) => {
    //     console.log("user auth", res);
    //     localStorage.setItem("isAuthenticated", true);
    //     localStorage.setItem("userId", res?.data?.id);
    //     setInputs(null);
    //     setIsAuthenticated(true);
    //     history.push("/products");
    //   })
    //   .catch((err) => {
    //     setError(
    //       err?.response?.data?.message ||
    //         "The Authentication Service is under maintenance and it will be back soon!, Thanks for your patience!!"
    //     );
    //   })
    //   .finally(() => setIsLoading(false));
    if (role === 'admin')
      adminRegister();
    else
      if (role === 'student')
        studentRegister();
      else
        if (role === 'teacher')
          teacherRegister();
  };

  return (
    <Box sx={{display: 'flex',alignItems:'center',justifyContent:'center',marginTop:"80px"}}>
        <form className={classes.formContainer} onSubmit={()=>handleSubmit}>
          {
          open ?
            <>
              <label className={classes.label}>
                <span className={classes.labelText}>Email</span>
                <input
                  className={classes.input}
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={(e)=>setSignup({...signup,email:e.target.value})}
                  autoComplete="off"
                  required
                />
              </label>
              <label className={classes.label}>
                <span className={classes.labelText}>Email</span>
                <input
                  className={classes.input}
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={(e)=>setSignup({...signup,email:e.target.value})}
                  autoComplete="off"
                  required
                />
              </label>
              <label className={classes.label}>
                <span className={classes.labelText}>Password:</span>
                <input
                  className={classes.input}
                  type="password"
                  name="password"
                  value={signup.password}
                  onChange={(e)=>setSignup({...signup,password:e.target.value})}
                  autoComplete="off"
                  required
                />
              </label> 
              <input className={classes.submit} type="submit" />
          </>
            :
          <Stack direction='row' spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
            <Box>Role</Box>
            <Stack spacing={2} direction='row'>
            <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Student" control={<Radio /> } onChange={()=>setRole('student')} label="Student" />
            <FormControlLabel value="Teacher" control={<Radio />} onChange={()=>setRole('teacher')} label="Teacher" />
            <FormControlLabel value="Admin" control={<Radio />} onChange={()=>setRole('admin')} label="Admin" />
          </RadioGroup>
          {/* </form> */}
          {role!=='' && <input className={classes.submit} type="submit" onClick={()=>setOpen(true)}/>}
          {error && <p className={classes.errorMsg}>{error}</p>}
          {isLoading && <p>isLoading ... </p>}
              
            </Stack>
          </Stack>
          }
      </form>
    </Box>
  );
};