import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './login';

const LoginAuth = () => {
  const navigate = useNavigate();

  if (localStorage.getItem('admintoken')) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    navigate('/admin');
    <Login />;
  }
};

export default LoginAuth;
