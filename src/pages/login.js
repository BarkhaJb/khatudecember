import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
    .post(`${process.env.REACT_APP_BASE_URL}/login`, data, {})
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (errors) {
        // console.log(errors.response);
      });
    // console.log(data);
  };
  return (
    <div className="logform">
      <h1 className="loghead">login</h1>
      <p className="logpara">please enter your login and password</p>
      <form onSubmit={handleSubmit(onSubmit)} className="loginform">
        <div className="form-group">
          <input
            type="text"
            className="inputearea"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg">Email is not valid.</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="inputearea"
            placeholder="Password"
            name="password"
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">password is required</p>
          )}
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">password is incorrect</p>
          )}
        </div>
        <div className="form-group">
          <label></label>
          <button type="submit" className="logbtn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
