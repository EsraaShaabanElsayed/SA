

import React, { useEffect, useState } from "react";
import classes from "./admin.module.css";
import { Course } from "../course/course.js";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import  Stack from "@mui/material/Stack";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers.js";
import axios from "axios";

 
export const Admin = ({ setIsAuthenticated }) => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [student_data, setstudent_data] = useState({ name: "", password: "" ,email :"",d_email:""});
    const [teacher_data, setteacher_data] = useState({ name: "", password: "" ,email :"",d_email:""});
    const [course_data, setcourse_data] = useState({ name: "" ,CreditHours: Number, toHaveDescription:"",d_name:""});
    const [productError, setProductError] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartError, setCartError] = useState(false);
    const [weather, setWeather] = useState("");
    const [weatherError, setWeatherError] = useState(false);
    const [latestProductAddedToCart, setLatestProductAddedToCart] = useState();

    const logoutHandler = () => {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        navigate("/login");
    };
    const addTeacher = () => {
        axios.post('http://localhost:8081/teacher', {
            name: teacher_data.name,
            email: teacher_data.email,
            password: teacher_data.password,
        })
        .then((response) => {
            // navigate("/");
            console.log('added successfully!');
        })
        .catch((error) => {
            console.log('there is an error');
        })
    }
    const addStudent = () => {
        axios.post('http://localhost:8082/student', {
            name: student_data.name,
            email: student_data.email,
            password: student_data.password,
        })
        .then((response) => {
            // navigate("/");
            console.log('added successfully!');
        })
        .catch((error) => {
            console.log('there is an error');
        })
    }
    const addCourse = () => {
        axios.post('http://localhost:8082/course', {
            name: course_data.name,
            creditHours: course_data.CreditHours,
            description: course_data.toHaveDescription,
        })
        .then((response) => {
            // navigate("/");
            console.log('added successfully!');
        })
        .catch((error) => {
            console.log('there is an error');
        })
    }
    const deleteCourse = () => {
        axios.delete(`http://localhost:8081/course/name/${course_data.d_name}`)   
        .then((response) => {
            // navigate("/");
            console.log(response.data);
        })
        .catch((error) => {
            console.log('there is an error');
        })
    }
    const deleteStudent = () => {
        axios.post(`http://localhost:8081/student/email/${student_data.d_email}`)
        .then((response) => {
            // navigate("/");
            console.log('deleted successfully!');
        })
        .catch((error) => {
            console.log('there is an error');
        })
    }
    const deleteTeacher = () => {
        axios.post(`http://localhost:8081/teacher/${teacher_data.d_email}`)
        .then((response) => {
            // navigate("/");
            console.log(response.data);
        })
        .catch((error) => {
            console.log('there is an error');
        })
    }
    /*
    useEffect(() => {
        async function fetchUserInfo() {
            try {
                // Assuming you have an API endpoint to fetch user info based on name and password
                const response = await api.getUserInfo(info.name, info.password);
                setInfo(response?.data); // Assuming response.data contains the user info
            } catch (error) {
                console.log("user info err", error);
                // Handle error
            }
        }

        fetchUserInfo();
    }, [info.name, info.password]);
*/
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.getAllProducts();
                setProducts(response?.data?.data);
            } catch (error) {
                console.log("products err", error);
                setProductError(
                    error?.response?.data?.message ||
                    "The courses Service is under maintenance and it will be back soon!, Thanks for your patience!!"
                );
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchCartData() {
            try {
                const userId = localStorage.getItem("userId");
                const response = await api.getProductsFromCart(userId);
                const cartProducts = response?.data?.data;
                const result = cartProducts?.map(
                    ({ productId }) =>
                        products?.find((product) => productId === product?._id) || false
                );
                setCart(result);
            } catch (error) {
                console.log("cart err", error);
                //setCartError(
                //error?.response?.data?.message ||
                //"The shopping cart Service is under maintenance and it will be back soon!, Thanks for your patience!!"
                // );
            }
        }

        fetchCartData();
    }, [products, latestProductAddedToCart]);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await api.getWeather();
                setWeather(response?.data?.value);
            } catch (error) {
                console.log("weather err", error);
                setWeatherError(
                    error?.response?.data?.message ||
                    "The Weather Service is under maintenance and it will be back soon!, Thanks for your patience!!"
                );
            }
        }

        fetchWeather();
    }, []);

    return (
        <>
            <Stack direction='row'>
            <span>Add Student</span>
            <form className={classes.formContainer} onSubmit={()=>addStudent()}>
                <label className={classes.label}>
                    <span className={classes.labelText}>Username:</span>
                    <input
                        className={classes.input}
                        type="text"
                        name="username"
                        autoComplete="off"
                        required
                        value={student_data.name}
                        onChange={(e)=>setstudent_data({...student_data,name:e.target.value})}
                        
                    />
                </label>
                <label className={classes.label}>
                    <span className={classes.labelText}>Email:</span>
                    <input
                        className={classes.input}
                        type="email"
                        name="email"
                        autoComplete="off"
                        required
                        value={student_data.email}
                        onChange={(e)=>setstudent_data({...student_data,email:e.target.value})}
                    />
                </label>
                <label className={classes.label}>
                    <span className={classes.labelText}>Password:</span>
                    <input
                        className={classes.input}
                        type="password"
                        name="password"
                        autoComplete="off"
                        required
                        value={student_data.password}
                        onChange={(e)=>setstudent_data({...student_data,password:e.target.value})}
                    />
                </label>
            </form>

            <span>Delete Student</span>
            <form className={classes.formContainer} onSubmit={()=>deleteStudent()}>
                <label className={classes.label}>
                    <span className={classes.labelText}>Email:</span>
                    <input
                        className={classes.input}
                        type="email"
                        name="email"
                        autoComplete="off"
                        required
                        value={student_data.d_email}
                        onChange={(e)=>setstudent_data({...student_data,d_email:e.target.value})}
                    />
                </label>
            </form>
            </Stack>
            <Stack direction='row'>
            <span>Add Teacher</span>
            <form className={classes.formContainer} onSubmit={(e)=>addTeacher()}>
                <label className={classes.label}>
                    <span className={classes.labelText}>Username:</span>
                    <input
                        className={classes.input}
                        type="text"
                        name="username"
                        autoComplete="off"
                        required
                        value={teacher_data.name}
                        onChange={(e)=>setteacher_data({...teacher_data,name:e.target.value})}
                        
                    />
                </label>
                <label className={classes.label}>
                    <span className={classes.labelText}>Email:</span>
                    <input
                        className={classes.input}
                        type="email"
                        name="email"
                        autoComplete="off"
                        required
                        value={teacher_data.email}
                        onChange={(e)=>setteacher_data({...teacher_data,email:e.target.value})}
                    />
                </label>
                <label className={classes.label}>
                    <span className={classes.labelText}>Password:</span>
                    <input
                        className={classes.input}
                        type="password"
                        name="password"
                        autoComplete="off"
                        required
                        value={teacher_data.password}
                        onChange={(e)=>setteacher_data({...teacher_data,password:e.target.value})}
                    />
                </label>
            </form>


            <span>Delete Teacher</span>
            <form className={classes.formContainer} onSubmit={()=>deleteTeacher()}>
                <label className={classes.label}>
                    <span className={classes.labelText}>Email:</span>
                    <input
                        className={classes.input}
                        type="email"
                        name="email"
                        autoComplete="off"
                        required
                        value={teacher_data.d_email}
                        onChange={(e)=>setteacher_data({...teacher_data,d_email:e.target.value})}
                    />
                </label>
            </form>
            </Stack>
            <Stack direction='row'>
            <span>Add Course</span>
            <form className={classes.formContainer} onSubmit={(e)=>addCourse()}>
                <label className={classes.label}>
                    <span className={classes.labelText}>CourseName:</span>
                    <input
                        className={classes.input}
                        type="text"
                        name="username"
                        autoComplete="off"
                        required
                        value={course_data.name}
                        onChange={(e)=>setcourse_data({...course_data,name:e.target.value})}
                        
                    />
                </label>
                <label className={classes.label}>
                    <span className={classes.labelText}>CreditHours:</span>
                    <input
                        className={classes.input}
                        type= "number"
                        name="cridetHours"
                        autoComplete="off"
                        required
                        value={course_data.CreditHours}
                        onChange={(e)=>setcourse_data({...course_data,CreditHours:e.target.value})}
                    />
                </label>
                <label className={classes.label}>
                    <span className={classes.labelText}>Description</span>
                    <input
                        className={classes.input}
                        type="text"
                        name="description"
                        autoComplete="off"
                        required
                        value={course_data.toHaveDescription}
                        onChange={(e)=>setcourse_data({...course_data,toHaveDescription:e.target.value})}
                    />
                </label>
            </form>


            <span>Delete Course</span>
            <form className={classes.formContainer} onSubmit={()=>deleteCourse()}>
                <label className={classes.label}>
                    <span className={classes.labelText}>Name</span>
                    <input
                        className={classes.input}
                        type="text"
                        name="name"
                        autoComplete="off"
                        required
                        value={course_data.d_name}
                        onChange={(e)=>setcourse_data({...course_data,d_name:e.target.value})}
                    />
                </label>
            </form>
            </Stack>

            <button className={classes.logout} onClick={logoutHandler}>
                Logout
            </button>

        </>
    );
}
export default Admin;