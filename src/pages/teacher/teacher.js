
import React, { useEffect, useState } from "react";
import classes from "./teacher.module.css";
import { Course } from "../course/course.js";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import  Stack from "@mui/material/Stack";
import axios from "axios";

export const Teacher = ({setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [info, setInfo] = useState({ name: "", password: "" });
  const [productError, setProductError] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartError, setCartError] = useState(false);
  const [course_data, setcourse_data] = useState({ name: "" ,CreditHours: Number, toHaveDescription:"",d_name:""});
  //const [weather, setWeather] = useState("");
 // const [weatherError, setWeatherError] = useState(false);
  const [latestProductAddedToCart, setLatestProductAddedToCart] = useState();

  const logoutHandler = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.getAllProducts();
        setProducts(response?.data?.data);
      } catch (error) {
        console.log("products err", error);
        setProductError(
          error?.response?.data?.message ||
            "The course Service is under maintenance and it will be back soon!, Thanks for your patience!!"
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
  //   const addCourse = () => {
  //     axios.post('http://localhost:8082/course', {
  //         name: course_data.name,
  //         creditHours: course_data.CreditHours,
  //         description: course_data.toHaveDescription,
  //     })
  //     .then((response) => {
  //         // navigate("/");
  //         console.log('added successfully!');
  //     })
  //     .catch((error) => {
  //         console.log('there is an error');
  //     })
  // }
    fetchCartData();
  }, [products, latestProductAddedToCart]);
/*
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
  }, []);*/

  return (
  
    <>
  <span>hello{info.name}</span>
       <p className={classes.weather}/>
      <span>YOUR COURSES</span>
      <div className={classes.container}>
        {productError && <p className={classes.errorMsg}>{productError}</p>}
        {!productError &&
          (products?.length > 0 ? (
            products.map(({ _id, name, price, description }, index) => (
              <Course
                key={index}
                details={{ _id, name, price, description }}
                setLatestProductAddedToCart={setLatestProductAddedToCart}
              />
            ))
          ) : (
            <p className={classes.notFound}>No Products found.</p>
          ))}
      </div>
      <Stack direction='row'>
            <span>Add Course</span>
            <form className={classes.formContainer} >
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
            <form className={classes.formContainer} >
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
};

export default Teacher;
