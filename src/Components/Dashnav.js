import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Components/assets/images/finallogo.png';

const Dashnav = ({ setRouteTrue }) => {
  const navigate = useNavigate();
  const navigatetodashnav = () => {
    navigate('/dashboard');
  };

  const navigatetologin = () => {
    setRouteTrue(false);
    localStorage.removeItem('admintoken');
    navigate('/admin');
  };
  return (
    <div className='Dashboardarea'>
      <nav class='navbar navbar-light bg-light justify-content-between'>
        <img src={logo} className='logoimg' onClick={navigatetodashnav} />
        <button className='logoutbtn' onClick={navigatetologin}>
          log out
        </button>
      </nav>
    </div>
  );
};

export default Dashnav;
