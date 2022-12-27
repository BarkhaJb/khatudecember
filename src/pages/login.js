import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Login = ({ setRouteTrue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errMsg, setErrMsg] = useState();
  const [authToken, setAuthToken] = useState();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post('http://localhost:3100/login', data, {})
      .then(function (response) {
        // console.log(response);
        setRouteTrue(true);
        localStorage.setItem('admintoken', response.data.token);

        navigate('/dashboard');
      })
      .catch(function (errors) {
        // console.log(errors.response.data.type);
        setErrMsg(errors?.response?.data?.type);
      });
    // console.log(data);
  };
  return (
    <div className='logform'>
      <h1 className='loghead'>login</h1>
      <p className='logpara'>please enter your login and password</p>
      <form onSubmit={handleSubmit(onSubmit)} className='loginform'>
        <div className='form-group logongroup'>
          <input
            type='text'
            className='inputearea'
            placeholder='Email'
            name='email'
            {...register('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p className='errorMsg'>Email is required.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className='errorMsg'>Email is not valid.</p>
          )}
        </div>
        <div className='form-group  logongroup'>
          <input
            type='password'
            className='inputearea'
            placeholder='Password'
            name='password'
            {...register('password', { required: true })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className='errorMsg'>password is required</p>
          )}
          {errors.password && errors.password.type === 'required' && (
            <p className='errorMsg'>password is incorrect</p>
          )}
        </div>
        <p className='errorMsg'>{errMsg}</p>

        <div className='form-group  logongroup'>
          <label></label>
          <button type='submit' className='logbtn'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
