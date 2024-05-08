
import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";
import {Stack} from "@mui/system";
// import { Input } from '@mui/joy/Input';

export const Login = ({ setIsAuthenticated }) => {
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
  const [login, setLogin] = useState({
    email: '',
    password: '',
    err: '',
    loading: false
  });

  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);


  const handleSubmit = () => {
    axios
        .post(`http://localhost:8090/${role}/login/${login.email}/${login.password}`)
        .then((response) => {
          console.log('logged in successfully!');
          if (role === 'admin')
            navigate('/admin');
          else 
            if (role === 'teacher')
              navigate('/teacher')
          else 
            if (role === 'student')
              navigate('/teacher')
        })
        .catch((error) => {
          console.log('something went wrong!');
        });
  };
  // console.log(role);
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
                  value={login.email}
                  onChange={(e)=>setLogin({...login,email:e.target.value})}
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
                  value={login.password}
                  onChange={(e)=>setLogin({...login,password:e.target.value})}
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
            <FormControlLabel value="Admin" control={<Radio />} onChange={()=>setRole('admin')} label="Adimn" />
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